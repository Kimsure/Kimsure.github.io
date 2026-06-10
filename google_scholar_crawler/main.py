import json
import os
import random
import time
from datetime import datetime, timezone

from scholarly import ProxyGenerator, scholarly


MAX_RETRIES = int(os.environ.get("GOOGLE_SCHOLAR_MAX_RETRIES", "4"))
PRE_ATTEMPT_DELAY_RANGE = (2.0, 5.0)
BACKOFF_DELAY_RANGE = (10.0, 20.0)
FETCH_STRATEGIES = ("direct", "free-proxy")


def configure_scholarly(strategy):
    scholarly.set_timeout(30)
    scholarly.set_retries(5)

    if strategy == "direct":
        scholarly.use_proxy(None)
        return

    if strategy == "free-proxy":
        proxy_generator = ProxyGenerator()
        proxy_generator.FreeProxies()
        scholarly.use_proxy(proxy_generator)
        return

    raise ValueError(f"Unknown strategy: {strategy}")


def fetch_author_data_once(author_id, strategy):
    configure_scholarly(strategy)
    author = scholarly.search_author_id(author_id)
    if not author:
        raise RuntimeError(
            "Google Scholar returned an empty author payload. "
            "This usually means the request was rate-limited or blocked."
        )

    scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])
    return author


def fetch_author_data_with_retry(author_id, max_retries=MAX_RETRIES):
    last_error = None

    for attempt in range(1, max_retries + 1):
        for strategy in FETCH_STRATEGIES:
            try:
                delay = random.uniform(*PRE_ATTEMPT_DELAY_RANGE)
                print(
                    f"Attempt {attempt}/{max_retries} with strategy '{strategy}', "
                    f"waiting {delay:.1f}s..."
                )
                time.sleep(delay)

                author = fetch_author_data_once(author_id, strategy)
                print(f"Successfully fetched data for {author.get('name', 'Unknown')}")
                return author
            except Exception as error:
                last_error = error
                print(
                    f"Attempt {attempt}/{max_retries} with strategy '{strategy}' failed: {error}"
                )

        if attempt < max_retries:
            backoff_delay = random.uniform(*BACKOFF_DELAY_RANGE)
            print(f"Retrying after {backoff_delay:.1f}s...")
            time.sleep(backoff_delay)

    raise RuntimeError(
        f"Failed to fetch author data after {max_retries} attempts"
    ) from last_error


def main():
    author_id = os.environ.get("GOOGLE_SCHOLAR_ID")
    if not author_id:
        raise ValueError("GOOGLE_SCHOLAR_ID environment variable not set")

    print(f"Fetching data for Google Scholar ID: {author_id}")

    try:
        author = fetch_author_data_with_retry(author_id)
        author["updated"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
        author["publications"] = {
            publication["author_pub_id"]: publication
            for publication in author.get("publications", [])
        }

        print(f"Author: {author.get('name', 'Unknown')}")
        print(f"Total Citations: {author.get('citedby', 'N/A')}")
        print(f"Publications: {len(author.get('publications', {}))}")

        os.makedirs("results", exist_ok=True)

        with open("results/gs_data.json", "w", encoding="utf-8") as outfile:
            json.dump(author, outfile, ensure_ascii=False, indent=2)
        print("Saved gs_data.json")

        shieldio_data = {
            "schemaVersion": 1,
            "label": "citations",
            "message": f"{author.get('citedby', '0')}",
        }
        with open("results/gs_data_shieldsio.json", "w", encoding="utf-8") as outfile:
            json.dump(shieldio_data, outfile, ensure_ascii=False)
        print("Saved gs_data_shieldsio.json")
        print("Data fetch completed successfully")
    except Exception as error:
        print(f"Error: {error}")
        raise


if __name__ == "__main__":
    main()

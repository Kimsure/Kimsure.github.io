from scholarly import scholarly
import json
from datetime import datetime
import os
import time
import random

def fetch_author_data_with_retry(author_id, max_retries=3):
    """带有重试机制的作者数据获取"""
    for attempt in range(max_retries):
        try:
            # 添加随机延迟避免被检测
            delay = random.uniform(2, 5)
            print(f"Attempt {attempt + 1}/{max_retries}, waiting {delay:.1f}s...")
            time.sleep(delay)

            author = scholarly.search_author_id(author_id)
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])

            print(f"Successfully fetched data for {author.get('name', 'Unknown')}")
            return author

        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {str(e)}")
            if attempt < max_retries - 1:
                # 失败后等待更长时间
                backoff_delay = random.uniform(10, 20)
                print(f"Retrying in {backoff_delay:.1f}s...")
                time.sleep(backoff_delay)

    raise Exception(f"Failed to fetch author data after {max_retries} attempts")

def main():
    # 验证环境变量
    author_id = os.environ.get('GOOGLE_SCHOLAR_ID')
    if not author_id:
        raise ValueError("GOOGLE_SCHOLAR_ID environment variable not set")

    print(f"Fetching data for Google Scholar ID: {author_id}")

    try:
        # 获取作者数据
        author = fetch_author_data_with_retry(author_id)

        # 更新时间戳
        author['updated'] = str(datetime.now())

        # 重组 publications 为字典格式
        author['publications'] = {v['author_pub_id']: v for v in author.get('publications', [])}

        print(f"Author: {author.get('name', 'Unknown')}")
        print(f"Total Citations: {author.get('citedby', 'N/A')}")
        print(f"Publications: {len(author.get('publications', {}))}")

        # 创建结果目录
        os.makedirs('results', exist_ok=True)

        # 保存完整数据
        with open('results/gs_data.json', 'w', encoding='utf-8') as outfile:
            json.dump(author, outfile, ensure_ascii=False, indent=2)
        print("Saved gs_data.json")

        # 保存 Shields.io 格式数据
        shieldio_data = {
            "schemaVersion": 1,
            "label": "citations",
            "message": f"{author.get('citedby', '0')}",
        }
        with open('results/gs_data_shieldsio.json', 'w', encoding='utf-8') as outfile:
            json.dump(shieldio_data, outfile, ensure_ascii=False)
        print("Saved gs_data_shieldsio.json")

        print("✓ Data fetch completed successfully")

    except Exception as e:
        print(f"✗ Error: {str(e)}")
        raise

if __name__ == "__main__":
    main()

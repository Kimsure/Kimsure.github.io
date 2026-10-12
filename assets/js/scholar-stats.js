(() => {
  const script = document.querySelector('script[data-scholar-stats-url]');
  if (!script) return;

  const normalizeTitle = (title) => String(title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const isCitationCount = (value) => Number.isInteger(value) && value >= 0;

  async function loadCitations() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(script.dataset.scholarStatsUrl, { signal: controller.signal });
      if (!response.ok) throw new Error(`Citation data returned HTTP ${response.status}`);
      const data = await response.json();
      const total = document.getElementById('total_cit');
      if (total && isCitationCount(data.citedby)) {
        total.textContent = data.citedby.toLocaleString('en-US');
        document.querySelectorAll('[data-total-citation-label]').forEach((label) => { label.hidden = false; });
      }

      const publications = data.publications || {};
      const byTitle = new Map(Object.values(publications).map((publication) => [
        normalizeTitle(publication.bib && publication.bib.title), publication
      ]));
      document.querySelectorAll('[data-scholar-title], .show_paper_citations').forEach((element) => {
        const paperId = element.getAttribute('data');
        const publication = paperId ? publications[paperId] : byTitle.get(normalizeTitle(element.dataset.scholarTitle));
        if (!publication || !isCitationCount(publication.num_citations)) return;
        const count = publication.num_citations.toLocaleString('en-US');
        element.textContent = element.classList.contains('show_paper_citations') ? `| Citations: ${count}` : `${count} citations`;
        element.hidden = false;
      });
    } catch (error) {
      // Keep the Scholar profile link usable if citation data is unavailable.
      console.warn('Failed to load Google Scholar stats:', error.message);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  loadCitations();
})();

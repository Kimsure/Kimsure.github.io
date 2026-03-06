# AGENTS.md - AcadHomepage Project Guide

This file provides essential information for AI coding agents working on this project.

## Project Overview

This is **AcadHomepage**, a modern and responsive academic personal homepage built with [Jekyll](https://jekyllrb.com/). It is designed for researchers and academics to showcase their publications, education, work experience, and other professional information.

The project is based on the [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) template by RayeRen, which itself is influenced by [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) and [academicpages](https://github.com/academicpages/academicpages.github.io).

**Key Features:**
- Automatically updates Google Scholar citations via GitHub Actions
- Responsive design for different screen sizes
- SEO optimized
- Support for Google Analytics
- Custom paper display with badges and citation counts

## Technology Stack

- **Static Site Generator**: Jekyll 3.9.0 (via github-pages gem)
- **Templating Language**: Liquid (Jekyll's default)
- **Styling**: SCSS/Sass
- **Markdown Processor**: Kramdown with GFM (GitHub Flavored Markdown)
- **Syntax Highlighter**: Rouge
- **Build Tool**: Bundler (Ruby gem management)
- **Package Manager**: pnpm (minimal usage)

### Python Components
- **Google Scholar Crawler**: Python 3 script using `scholarly` library
- **Dependencies**: `jsonpickle==1.4.2`, `scholarly==1.5.1`

## Project Structure

```
/
├── _config.yml              # Main Jekyll configuration
├── _layouts/                # Jekyll layouts
│   └── default.html         # Main page layout
├── _includes/               # Reusable template components
│   ├── head.html            # HTML head section
│   ├── author-profile.html  # Sidebar author profile
│   ├── masthead.html        # Top navigation bar
│   ├── sidebar.html         # Left sidebar
│   ├── scripts.html         # JavaScript includes
│   ├── seo.html             # SEO meta tags
│   └── fetch_google_scholar_stats.html  # Citation fetching script
├── _pages/                  # Content pages
│   ├── about.md             # Main homepage content (publications, news, etc.)
│   └── funzone.md           # Games page (Snake, Tetris)
├── _data/                   # Data files
│   └── navigation.yml       # Navigation menu items
├── _sass/                   # SCSS partials
│   ├── _variables.scss      # Theme variables
│   ├── _base.scss           # Base styles
│   ├── _sidebar.scss        # Sidebar styles
│   ├── _page.scss           # Page content styles
│   └── ...                  # Other SCSS partials
├── assets/                  # Static assets
│   ├── css/
│   │   └── main.scss        # Main stylesheet entry point
│   ├── js/
│   │   ├── snake.js         # Snake game implementation
│   │   ├── tetris.js        # Tetris game implementation
│   │   └── ...              # Other JavaScript files
│   └── fonts/               # Icon fonts
├── images/                  # Image assets (photos, paper figures, posters)
├── google_scholar_crawler/  # Python crawler for citation stats
│   ├── main.py              # Main crawler script
│   └── requirements.txt     # Python dependencies
├── .github/workflows/       # GitHub Actions
│   └── google_scholar_crawler.yaml  # Automated citation updates
├── Gemfile                  # Ruby dependencies
├── package.json             # Node.js dependencies (minimal)
└── run_server.sh            # Local development server script
```

## Build and Development Commands

### Prerequisites
- Ruby (with RubyGems)
- Bundler (`gem install bundler`)
- Jekyll dependencies: `bundle install`

### Local Development

```bash
# Start the development server with live reload
bash run_server.sh

# Or manually:
bundle exec jekyll liveserve
```

The site will be available at `http://127.0.0.1:4000`.

### Build for Production

```bash
bundle exec jekyll build
```

Output is generated in the `_site/` directory (excluded from git).

## Configuration

### Main Configuration File: `_config.yml`

Key sections to modify:

```yaml
# Site identity
title: "Your Name"
description: "Your description"
repository: "USERNAME/REPO_NAME"

# Google Scholar integration
google_scholar_stats_use_cdn: true  # Use jsDelivr CDN for citation data

# Author information (displayed in sidebar)
author:
  name: "Your Name"
  avatar: "images/your-photo.png"
  bio: "Your Institution"
  location: "Your Location"
  email: "your@email.com"
  github: "your-github"
  googlescholar: "https://scholar.google.com/citations?user=YOUR_ID"
  linkedin: "your-linkedin"
  orcid: "https://orcid.org/0000-0000-0000-0000"
  # ... other social links
```

### Navigation Menu: `_data/navigation.yml`

Defines the top navigation links. Each entry has a `title` and `url`:

```yaml
main:
  - title: "About Me"
    url: "/#about-me"
  - title: "Publications"
    url: "/#-publications"
  # ... more items
```

## Content Management

### Main Content Page: `_pages/about.md`

This is the primary content file containing:
- Personal introduction/bio
- News section
- Publications (with paper boxes)
- Education history
- Work experience
- Other sections

**Paper Display Format:**
```html
<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Conference Name</div>
      <img src='images/paper-figure.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text' markdown="1">
    Paper Title
    **Author Name**, Co-author Name
    [![project](https://img.shields.io/badge/Project-Name-green)](link)
    [![arXiv](https://img.shields.io/badge/Paper-Conference-b31b1b)](link)
  </div>
</div>
```

**Citation Display:**
To display Google Scholar citations for a paper:
```html
<span class='show_paper_citations' data='PAPER_ID'></span>
```

## Google Scholar Integration

### Setup
1. Find your Google Scholar ID from your profile URL: `https://scholar.google.com/citations?user=SCHOLAR_ID`
2. Add it as a GitHub Secret: `Settings -> Secrets -> Actions -> New repository secret`
   - Name: `GOOGLE_SCHOLAR_ID`
   - Value: Your Scholar ID

### How It Works
- The GitHub Action (`.github/workflows/google_scholar_crawler.yaml`) runs:
  - On every page build
  - Daily at 08:00 UTC (cron schedule)
- The Python script (`google_scholar_crawler/main.py`) fetches citation data
- Results are pushed to the `google-scholar-stats` branch as JSON files
- The site fetches this data via CDN (jsDelivr) or raw GitHub content

### Output Files
- `gs_data.json`: Full author and publication data
- `gs_data_shieldsio.json`: Formatted for Shields.io badges

## Code Style Guidelines

### Jekyll/Liquid
- Use 2-space indentation
- Include proper YAML front matter in all pages/layouts
- Use Liquid filters for text processing: `{{ content | markdownify | strip_html }}`

### SCSS/CSS
- The project uses the Minimal Mistakes SCSS architecture
- Custom styles are added to `assets/css/main.scss` after vendor imports
- Responsive breakpoints are defined in `_sass/_variables.scss`
- Use the `breakpoint()` mixin for media queries

### Custom CSS Classes
- `.paper-box`: Publication display container (flex layout)
- `.paper-box-image`: Left side with paper figure
- `.paper-box-text`: Right side with paper details
- `.badge`: Conference/journal label on paper images
- `.anchor`: Section anchor for navigation

## Testing

There are no automated tests in this project. Testing is done manually:

1. Run `bash run_server.sh` to start local server
2. Verify all pages render correctly
3. Check responsive behavior by resizing browser
4. Verify navigation links work
5. Check that images load properly

## Deployment

This site is designed for **GitHub Pages** deployment:

1. Fork the repository
2. Rename to `USERNAME.github.io`
3. Configure `_config.yml` with your information
4. Push changes to the main branch
5. GitHub Pages will automatically build and deploy

The site will be live at `https://USERNAME.github.io`.

## Security Considerations

- **GitHub Secrets**: The `GOOGLE_SCHOLAR_ID` is stored as a GitHub Secret and accessed via `${{ secrets.GOOGLE_SCHOLAR_ID }}` in workflows
- **No sensitive data in repo**: Do not commit API keys, passwords, or personal tokens to the repository
- **CDN for citation data**: Citation data is fetched from a public CDN (jsDelivr), so citation counts are publicly visible

## Important File Locations

| Purpose | File Path |
|---------|-----------|
| Main config | `_config.yml` |
| Homepage content | `_pages/about.md` |
| Navigation menu | `_data/navigation.yml` |
| Author profile sidebar | `_includes/author-profile.html` |
| Main layout | `_layouts/default.html` |
| Styles entry | `assets/css/main.scss` |
| Google Scholar crawler | `google_scholar_crawler/main.py` |
| GitHub Actions workflow | `.github/workflows/google_scholar_crawler.yaml` |
| Local dev script | `run_server.sh` |

## Dependencies

### Ruby Gems (from Gemfile)
- `github-pages`: GitHub Pages compatibility gem (includes Jekyll and plugins)
- `jekyll-feed`: Atom feed generation
- `jekyll-sitemap`: XML sitemap generation
- `hawkins`: Live reload functionality

### Python Packages
- `scholarly==1.5.1`: Google Scholar scraping
- `jsonpickle==1.4.2`: JSON serialization

## Notes for AI Agents

- This is a **static site** - no server-side processing after build
- Content is primarily in Markdown with HTML for complex layouts
- The site is **responsive** - test changes at different screen sizes
- Google Scholar integration requires the GitHub Action to be enabled
- The `funzone.md` page contains interactive JavaScript games (Snake, Tetris)
- All links in the head section have `target="_blank"` (opens in new tab)

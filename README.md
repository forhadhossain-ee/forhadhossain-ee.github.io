# Forhad Hossain — Portfolio Website

A modern, fully responsive portfolio website for Forhad Hossain, an Electrical Engineering student at President University, Indonesia. Built with a clean design system featuring deep forest green, gold, and cream branding.

**Live URL:** [forhadhossain.com](https://www.forhadhossain.com)  
**GitHub:** [github.com/forhad-ee](https://github.com/forhad-ee)

---

## 📸 Features

- **Single-page homepage** with all sections: Hero, About, Experience, Education, Skills, Projects, Gallery, CTA
- **Project Log page** (`/pages/projects.html`) with filterable project cards (IoT, Arduino, MATLAB, ETAP, AutoCAD)
- **Interactive Gallery** — toggleable full gallery on homepage
- **Scroll Spy Navigation** — active link updates as you scroll
- **Smooth Scroll Back to Top** button in footer
- **Fully Responsive** — works on desktop, tablet, and mobile
- **SEO Optimized** — meta tags, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt
- **Clean, Maintainable Code** — HTML, CSS, and JS separated

---

## 🎨 Design System

All design tokens are centralized in `css/style.css`. This ensures consistency across the entire site.

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--forest` | `#0D2B1C` | Primary dark background |
| `--gold` | `#C5A55A` | Accent color, borders, highlights |
| `--gold-deep` | `#A4813C` | Darker gold for text |
| `--cream` | `#F5F0E8` | Light background, buttons |
| `--canvas` | `#F7F4EE` | Section backgrounds |
| `--paper` | `#FFFFFF` | Card backgrounds |
| `--on-dark` | `#F5F0E8` | Text on dark backgrounds |
| `--muted` | `#5A7A6A` | Secondary text |

### Typography

| Element | Font | Weight |
|---------|------|--------|
| Headings (h1-h4) | Space Grotesk | 700–800 |
| Body, paragraphs, buttons | Inter | 400–700 |

### Spacing Scale

`--sp-1` through `--sp-8` (8, 16, 24, 32, 48, 64, 96, 128px) — use these consistently.

### Border Radius

- `--r-tag`: 6px (tags, small elements)
- `--r-card`: 14px (cards)
- `--r-pill`: 999px (buttons, pill shapes)

---

## 📁 File Structure (Assets Placement Guide)

**এখান থেকে দেখুন আপনার ছবি ও ফাইলগুলো ঠিক কোথায় এবং কী নামে রাখতে হবে:**


## 📁 File Structure (Assets Placement Guide)

**এখান থেকে দেখুন আপনার ছবি ও ফাইলগুলো ঠিক কোথায় এবং কী নামে রাখতে হবে:**

```
forhad-portfolio-v3-final/
│
├── index.html                  # Homepage (all sections)
├── pages/
│   └── projects.html           # Full Project Log (filterable)
│
├── css/
│   └── style.css               # Master stylesheet (all CSS)
│
├── js/
│   └── script.js               # All JavaScript (nav, reveal, filters, gallery, scroll spy)
│
├── assets/
│   ├── profile/
│   │   └── profile.jpg         # Hero profile photo
│   ├── experience/
│   │   └── site-work.jpg       # Experience section image (rectangle)
│   ├── education/
│   │   └── university.jpg      # Education background image
│   ├── resume/
│   │   └── Forhad-Hossain-CV.pdf
│   ├── projects/
│   │   ├── iot/
│   │   │   └── flood-sensor.jpg
│   │   ├── arduino/
│   │   │   ├── project-01.jpg
│   │   │   ├── project-02.jpg
│   │   │   ├── project-03.jpg
│   │   │   ├── project-04.jpg
│   │   │   └── project-05.jpg
│   │   ├── matlab/
│   │   │   ├── project-01.jpg
│   │   │   ├── project-02.jpg
│   │   │   ├── project-03.jpg
│   │   │   ├── project-04.jpg
│   │   │   └── project-05.jpg
│   │   ├── etap/
│   │   │   ├── beginner-01.jpg ... beginner-05.jpg
│   │   │   ├── medium-01.jpg ... medium-05.jpg
│   │   │   └── advanced-01.jpg ... advanced-05.jpg
│   │   └── autocad/
│   │       ├── beginner-01.jpg ... beginner-05.jpg
│   │       ├── medium-01.jpg ... medium-05.jpg
│   │       └── advanced-01.jpg ... advanced-05.jpg
│   └── gallery/
│       ├── thumb-01.jpg
│       ├── thumb-02.jpg
│       ├── thumb-03.jpg
│       ├── cert-01.jpg
│       ├── cert-02.jpg
│       ├── event-01.jpg
│       ├── event-02.jpg
│       ├── achievement-01.jpg
│       └── achievement-02.jpg
│
├── robots.txt                  # Search engine crawling rules
├── sitemap.xml                 # Site sitemap for search engines
└── README.md                   # This file
```
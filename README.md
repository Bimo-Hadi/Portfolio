# Personal Portfolio

The layout is inspired by [vCard](https://github.com/codewithsadee/vcard-personal-portfolio).

A responsive portfolio website (plain HTML + CSS + JavaScript, no build step, no npm).
Its layout (profile sidebar + tabbed pages) follows that inspiration, but all code,
design, and assets were rewritten from scratch with a number of improvements.

## How to run (one step)

**Easiest:** double-click `index.html`. Done.

**Or use a local server** (closer to the online environment):

- Windows: double-click `start.bat`
- macOS / Linux: run `./start.sh` (if needed: `chmod +x start.sh`)
- Manual: `python -m http.server 8080`, then open http://localhost:8080

Nothing needs to be installed. Google Fonts are loaded from the internet when
available; when offline, the site automatically falls back to system fonts.

## Changing the content

All content lives in **`js/data.js`**: name, photo, contact details, services,
testimonials, resume, skills, projects, and blog posts. Text is written in two
languages:

```js
title: { id: "Judul Indonesia", en: "English title" }
```

| What you want to change   | Where                                               |
| ------------------------- | --------------------------------------------------- |
| Name, email, social media | `js/data.js` → `profile`                            |
| Profile photo             | replace `assets/img/avatar.png` (or use `.jpg` and update `profile.avatar`) |
| Projects                  | `js/data.js` → `projects` (images in `assets/img/`) |
| Blog posts                | `js/data.js` → `posts`                              |
| Button/label text         | `js/i18n.js`                                        |
| Base and accent colors    | top of `css/style.css`                              |

### Contact form
By default, the form opens the email app with a ready-to-send message (`mailto:`).
To send messages directly from the website, sign up for a form service such as
Formspree and fill in `contact.endpoint` in `js/data.js` with its URL.

## What was changed compared to the original vCard

- **Light/dark** theme (follows the system and remembers your choice) and **4 accent colors**
- **Two languages**, Indonesian/English, with one click
- Content **centralized in `data.js`**, so there is no need to edit the HTML
- Typing effect for roles, animated statistics counters, and animated skill bars
- Portfolio with **filter + search** and a project detail window
- Blog with **topic filter + search** and an article reader
- Testimonials that can be opened in full, a technology list, and services
- Contact form with **validation**, a copy-email button, and a WhatsApp link
- **Print / save as PDF** button for the resume (dedicated print layout)
- Accessibility: skip-to-content link, visible keyboard focus, ARIA, `prefers-reduced-motion`
- No dependencies: all images are local **PNG/JPG** files, so it works offline
- Hash-based routing, so `index.html#portfolio` can be shared directly

## Structure

```
Portofolio-Bimo.github.io/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ data.js     ← content (edit here)
│  ├─ i18n.js     ← interface text
│  └─ app.js      ← logic
├─ assets/
│  ├─ favicon.png, apple-touch-icon.png
│  └─ img/        ← avatar.png, project-*.jpg, blog-*.jpg
├─ start.bat / start.sh
└─ LICENSE
```

## Recommended image sizes

| Image           | Size             | Format     |
| --------------- | ---------------- | ---------- |
| Profile photo   | 800 × 800 px     | PNG / JPG  |
| Project cover   | 1600 × 1000 px   | JPG        |
| Blog cover      | 1600 × 900 px    | JPG        |
| Favicon         | 256 × 256 px     | PNG        |

The sample images are made at twice their display size to stay sharp on retina screens.
Images are cropped automatically (`object-fit: cover`), so different aspect ratios are still safe to use.

## Notes
The name, contact details, projects, and articles are **fictional examples**. Replace them before publishing.
For free hosting, upload the whole folder to GitHub Pages, Netlify, or Cloudflare Pages.

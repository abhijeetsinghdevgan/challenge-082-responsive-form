# Responsive Registration Form

A responsive, multi-step course registration and survey form built with **HTML**, **CSS**, and **JavaScript** — no frameworks required.

**GitHub:** https://github.com/abhijeetsinghdevgan/challenge-082-responsive-form

---

## Overview

Forms are in sign-ups, course registration, and surveys. This project demonstrates a polished, accessible form experience with step-by-step navigation, real-time validation, and a mobile-first responsive layout.

Part of **Challenge #082 — Prompt: Form**.

---

## Features

- **3-step wizard** — Personal info → Course selection → Survey
- **Inline validation** — Real-time error messages with field-level feedback
- **Responsive design** — Mobile-first layout with CSS Grid and Flexbox
- **Accessible markup** — ARIA labels, keyboard navigation, focus states
- **Live summary sidebar** — Updates as selections change
- **Success modal** — Confirmation on submit (demo — no backend)

---

## Tech Stack

| Technology | Use |
|------------|-----|
| HTML5 | Semantic form structure |
| CSS3 | Grid, Flexbox, custom properties, media queries |
| JavaScript | Step navigation, validation, DOM updates |

---

## Project Structure

```
├── index.html    # Form markup and layout
├── styles.css    # Responsive styling
├── script.js     # Validation and interactivity
└── README.md
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/abhijeetsinghdevgan/challenge-082-responsive-form.git
cd challenge-082-responsive-form
```

### Run locally

Open `index.html` in your browser, or serve the folder with any static server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## Form Steps

1. **Personal** — Name, email, phone, date of birth
2. **Course** — Track selection, cohort, learning format, terms agreement
3. **Survey** — Experience level, referral source, goals, satisfaction rating

---

## License

Free to use for learning and personal projects.

---

## Author

[abhijeetsinghdevgan](https://github.com/abhijeetsinghdevgan)

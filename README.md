# My Love – Romantic Birthday Surprise 💗

A responsive birthday surprise website made with HTML, CSS and vanilla JavaScript.

## Run the website
1. Extract `my-love-birthday.zip`.
2. Open the `my-love-birthday` folder.
3. Double-click `index.html` to open it in your browser.

For the smoothest local development experience, you can also open the folder in VS Code and use the Live Server extension.

## Add your personal photos
Replace the six SVG placeholders in `assets/photos/` with your own photos. Keep the filenames `photo-1.svg` etc. if you replace them with SVGs. For JPG photos:
- Put your images in `assets/photos/` as `photo-1.jpg` through `photo-6.jpg`.
- In `index.html`, change each matching image path from `.svg` to `.jpg`.

## Music player
The music player has been removed as requested.

## Personalize the letter
Edit the text inside `letter-page-1` and `letter-page-2` in `index.html`. The display name is currently “My Love” and can be replaced when you decide on the name.

## Birthday countdown
The countdown targets **13 November 2026 at 00:00 India Standard Time (IST)**. After that moment, the birthday celebration banner appears and confetti is triggered.

## Project structure
```text
my-love-birthday/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── photos/
    │   ├── photo-1.svg
    │   ├── photo-2.svg
    │   ├── photo-3.svg
    │   ├── photo-4.svg
    │   ├── photo-5.svg
    │   └── photo-6.svg
    ├── audio/
    │   └── ADD-perfect-mp3-HERE.txt
    └── images/
```

Fonts load from Google Fonts when online; system fallbacks are included.

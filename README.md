# Business Website

A modern, responsive website template for Portfolio/Business/Blog/App landing pages.

## Pages Included

- **Home** (`index.html`) - Hero section with features and call-to-action
- **About** (`about.html`) - Company story, mission, and values
- **Services** (`services.html`) - Showcase of products and services
- **Contact** (`contact.html`) - Contact form and business information

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern, clean UI with smooth animations
- ✅ Mobile-friendly navigation menu
- ✅ Contact form with validation
- ✅ Easy to customize colors and content
- ✅ Fast loading and optimized

## Getting Started

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser. All pages are linked together and ready to use.

### Option 2: Use a Local Server (Recommended)

For the best experience, use a local web server. We've included two server scripts:

**Using Python Server (Included):**
```bash
cd website
python3 server.py
```
The server will automatically open your browser at http://localhost:8000

**Using Node.js Server (Included):**
```bash
cd website
node server.js
```
Or use npm:
```bash
cd website
npm start
```
The server will automatically open your browser at http://localhost:8000

**Alternative: Simple Python HTTP Server:**
```bash
cd website
python3 -m http.server 8000
```
Then manually open http://localhost:8000 in your browser.

**Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --secondary-color: #1e40af;  /* Secondary color */
    --accent-color: #3b82f6;     /* Accent color */
}
```

### Content
- Update business name: Search and replace "Your Business Name" and "Your Brand"
- Modify page content: Edit the HTML files directly
- Add images: Replace placeholder divs with `<img>` tags
- Update contact information: Edit the contact details in `contact.html`

### Adding Pages
1. Create a new HTML file
2. Copy the navigation structure from existing pages
3. Update the navigation links
4. Add your content

## File Structure

```
website/
├── index.html      # Home page
├── about.html      # About page
├── services.html   # Services/Products page
├── contact.html    # Contact page
├── styles.css      # All styles
├── script.js       # JavaScript functionality
├── server.py       # Python server script
├── server.js       # Node.js server script
├── package.json    # Node.js package configuration
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The contact form currently shows an alert on submit. To actually send emails, you'll need to integrate with a backend service or email API.
- Replace placeholder images with your actual images.
- Update all placeholder text with your actual business information.

## License

Feel free to use this template for your projects!
# MyWebsite

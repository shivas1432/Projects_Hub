# 🔗 URL Shortener

A simple web app to shorten long URLs into easy-to-share short links. Built with Python and Flask.

## What It Does

- Shortens long URLs into compact links
- Tracks how many times each link is clicked
- User accounts to manage your shortened URLs
- Clean, simple web interface

## Quick Start

### 1. Install Dependencies
```bash
pip3 install -r requirements.txt
```

### 2. Run the App
```bash
python3 app.py
```

### 3. Open Your Browser
Go to: `http://localhost:8000`

## First Steps

1. **Create an account** - Click "Register" to sign up
2. **Log in** - Use your new account credentials
3. **Shorten URLs** - Paste long links in the dashboard
4. **Share your short links** - Copy the generated short URLs
5. **Track clicks** - See how many times each link was clicked

## Features

- ✅ User registration and login
- ✅ URL shortening with random codes
- ✅ Click counter for each link
- ✅ Personal dashboard
- ✅ Delete unwanted short links
- ✅ Mobile-friendly design

## Project Structure

```
url_shortener/
├── app.py              # Main application
├── models.py           # Database models
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── dashboard.html
│   ├── login.html
│   └── register.html
└── static/
    └── style.css       # Stylesheet
```

## Tech Stuff

- **Backend**: Flask (Python)
- **Database**: SQLite with SQLAlchemy
- **Authentication**: Flask-Login
- **Frontend**: HTML, CSS, Jinja2 templates

## Need Help?

If the app doesn't start on port 8000, try:
```bash
PORT=8080 python3 app.py
```
Then visit: `http://localhost:8080`

---

*Made with Flask - a great project for learning web development!* 🚀

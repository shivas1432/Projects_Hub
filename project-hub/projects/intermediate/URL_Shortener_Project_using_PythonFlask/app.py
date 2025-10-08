from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, User, URL
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here-change-this-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///url_shortener.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def is_valid_url(url):
    """Simple URL validation without external dependencies"""
    # Basic URL pattern check
    pattern = re.compile(
        r'^(https?://)'  # http:// or https://
        r'([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}'  # domain
        r'(:[0-9]+)?'  # optional port
        r'(/.*)?$'  # optional path
    )
    return bool(pattern.match(url))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('register'))
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('register'))
        
        user = User(username=username, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! Please log in.')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    user_urls = URL.query.filter_by(user_id=current_user.id).order_by(URL.created_at.desc()).all()
    return render_template('dashboard.html', urls=user_urls)

@app.route('/shorten', methods=['POST'])
@login_required
def shorten_url():
    original_url = request.form['url']
    
    # Add https:// if no protocol is specified
    if not original_url.startswith(('http://', 'https://')):
        original_url = 'https://' + original_url
    
    if not is_valid_url(original_url):
        flash('Please enter a valid URL (e.g., https://example.com)')
        return redirect(url_for('dashboard'))
    
    # Check if URL already exists for user
    existing_url = URL.query.filter_by(original_url=original_url, user_id=current_user.id).first()
    if existing_url:
        flash('URL already shortened!')
        return redirect(url_for('dashboard'))
    
    new_url = URL(original_url=original_url, user_id=current_user.id)
    new_url.short_code = new_url.generate_short_code()
    
    db.session.add(new_url)
    db.session.commit()
    
    flash('URL shortened successfully!')
    return redirect(url_for('dashboard'))

@app.route('/<short_code>')
def redirect_to_url(short_code):
    url_entry = URL.query.filter_by(short_code=short_code).first_or_404()
    url_entry.clicks += 1
    db.session.commit()
    return redirect(url_entry.original_url)

@app.route('/delete/<int:url_id>')
@login_required
def delete_url(url_id):
    url_entry = URL.query.get_or_404(url_id)
    if url_entry.user_id != current_user.id:
        flash('You can only delete your own URLs')
        return redirect(url_for('dashboard'))
    
    db.session.delete(url_entry)
    db.session.commit()
    flash('URL deleted successfully')
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8000)
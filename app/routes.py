from flask import render_template, flash
from app import app
from app.forms import MainForm

@app.route('/', methods=['GET','POST'])
@app.route('/search', methods=['GET','POST'])
def search():
    form = MainForm()
    if form.validate_on_submit():
        flash('Ratings Searched for TV Show: {}'.format(form.seriesname.data))
    return render_template('form.html', title='Search Ratings', form=form)

@app.route('/index')
def index():
    user = {'username': 'Nithin'}
    return render_template('index.html', title='Home', user=user)

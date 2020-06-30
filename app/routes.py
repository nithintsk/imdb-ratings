from flask import render_template, flash, redirect, url_for, request
from app import app
from app.forms import MainForm
from imdb import IMDb

@app.route('/', methods=['GET','POST'])
@app.route('/search', methods=['GET','POST'])
def search():
    form = MainForm()
    series_list=[]
    if form.validate_on_submit():
        ia = IMDb()
        series_list = ia.search_movie(form.seriesname.data)
        return render_template('form.html', title='Matching TV series', form=form, series_list=series_list)
        #return redirect(url_for('ratings', tvseries=form.seriesname.data))
    return render_template('form.html', title='TV series list', form=form)

@app.route('/index')
def index():
    user = {'username': 'Nithin'}
    return render_template('index.html', title='Home', user=user)

@app.route('/ratings')
def ratings():
    return render_template('ratings.html', series_id=request.args.get('series_id'))

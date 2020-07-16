from flask import render_template, redirect, url_for, request, jsonify
from app import app
from app.forms import MainForm
from imdb import IMDb

@app.route('/', methods=['GET'])
@app.route('/search', methods=['GET'])
def search():
    matching_tv_series = dict()
    ia = IMDb()
    query = request.args.get("seriesName")
    series_list = ia.search_movie(query)
    for series in series_list:
        if 'tv' in series['kind']:
            tv_obj = dict()
            series_name = '{0} ({1})'.format(series['title'], series['year'])
            tv_obj['id'] = series.getID()
            tv_obj['URL'] = series.get_fullsizeURL()
            matching_tv_series[series_name] = tv_obj
    response = jsonify(matching_tv_series)
    # https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/index')
def index():
    user = {'username': 'Nithin'}
    return render_template('index.html', title='Home', user=user)

@app.route('/ratings')
def ratings():
    ia =IMDb()
    series = ia.get_movie(request.args.get('series_id'))
    ia.update(series, 'episodes')
    episodes_dict = dict()
    series_name = '{0} ({1})'.format(series['title'], series['year'])
    for season, episodes in series['episodes'].items():
        if season not in episodes_dict:
            episodes_dict[season] = dict()
        for episode_num, episode in episodes.items():
            val = episode.get('rating')
            if val is not None:
                episodes_dict[season][episode_num] = "{:.2f}".format(val)
        if not episodes_dict[season]:
            del episodes_dict[season]

    return render_template('ratings.html', episodes=episodes_dict, name=series_name)

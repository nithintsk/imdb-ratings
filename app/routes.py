from flask import render_template, redirect, url_for, request, jsonify
from app import app
from app.forms import MainForm
from imdb import IMDb

@app.route('/', methods=['GET'])
@app.route('/search', methods=['GET'])
def search():
    matching_tv_series = list()
    ia = IMDb()
    query = request.args.get("seriesName")
    series_list = ia.search_movie(query)
    for series in series_list:
        if 'tv' in series['kind']:
            tv_obj = dict()
            series_name = '{0} ({1})'.format(series['title'], series['year'])
            tv_obj['id'] = series.getID()
            tv_obj['URL'] = series.get_fullsizeURL()
            tv_obj['name'] = series_name;
            matching_tv_series.append(tv_obj)
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
    episodes_dict['title']       = series['original title']
    episodes_dict['rating']      = series['rating']
    episodes_dict['num_seasons'] = series['number of seasons']
    episodes_dict['coverURL']    = series.get_fullsizeURL()
    episodes_dict['URL']         = 'http://www.imdb.com/title/tt{0}/'.format(request.args.get('series_id'))
    
    show_ratings = dict()
    for season, episodes in series['episodes'].items():
        if season not in show_ratings:
            show_ratings[season] = dict()
            show_ratings[season]['season'] = season
        for episode_num, episode in episodes.items():
            val = episode.get('rating')
            if val is not None:
                show_ratings[season][str(episode_num)] = "{:.2f}".format(val)
        if not show_ratings[season]:
            del show_ratings[season]
    ratings_list = []
    for i in range(1, len(show_ratings.keys())+1):
        ratings_list.append(show_ratings[i])
    episodes_dict['results'] = ratings_list

    response = jsonify(episodes_dict)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

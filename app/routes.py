from flask import render_template, redirect, url_for, request, jsonify
from app import app
from app.forms import MainForm
from imdb import IMDb
import collections

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
            series_name = series['smart long imdb canonical title'] 
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
    episodes_dict['title']       = series.get('original title')
    episodes_dict['rating']      = series.get('rating')
    episodes_dict['num_seasons'] = series.get('number of seasons')
    episodes_dict['coverURL']    = series.get_fullsizeURL()
    episodes_dict['URL']         = 'http://www.imdb.com/title/tt{0}/'.format(request.args.get('series_id'))
    
    show_ratings = dict()
    for season, episodes in series['episodes'].items():
        if season not in show_ratings:
            show_ratings[season] = dict()
        for episode_num, episode in episodes.items():
            ep_data = dict()
            rating_val = episode.get('rating')
            title_val = episode.get('title')
            if rating_val is not None:
                ep_data['rating'] = "{:.2f}".format(rating_val)
                if title_val is not None:
                    ep_data['title'] = title_val
                else:
                    ep_data['title'] = "Unknown"
                show_ratings[season][episode_num] = ep_data
        if not show_ratings[season]:
            del show_ratings[season]
    ratings_list = []
    od = collections.OrderedDict(sorted(show_ratings.items()))
    for k, v in od.items():
        if k >= 0:
            ratings_list.append(v)
    episodes_dict['results'] = ratings_list

    response = jsonify(episodes_dict)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

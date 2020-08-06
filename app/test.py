import imdb
from flask import jsonify
ia = imdb.IMDb()
series_id = input("Enter TV id: ")
series = ia.get_movie(series_id)
print("Fetching Episodes...")
ia.update(series, 'episodes')
print("Finished fetching episodes")
episodes_dict = dict()
episodes_dict['title']       = series['original title']
episodes_dict['rating']      = series['rating']
episodes_dict['num_seasons'] = series['number of seasons']
episodes_dict['coverURL']    = series.get_fullsizeURL()
episodes_dict['URL']         = 'http://www.imdb.com/title/tt{0}/'.format(series_id)
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
print(ratings_list)
print(jsonify(ratings_list))

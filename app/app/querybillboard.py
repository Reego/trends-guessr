import random
import datetime
import time

import billboard as charts

DEF_DATE = '-01-01'
DEF_DATE_2019 = '-10-20'
DEF_NUM_SONGS = 10
DEF_START_YEAR = 1960
DEF_END_YEAR = 2019
DEF_SAME_YEAR_DATE = '-12-31'

# # MIN_DATE = time.mktime(datetime.datetime(2005, 1, 1).timetuple())
# # MAX_DATE = time.mktime(datetime.datetime(2019, 10, 1).timetuple())
# MIN_DATE = '2005-01-01'
# MAX_DATE = '2019-01-01'

def str_time_prop(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times.

    start and end should be strings specifying times formated in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randate(start, end, prop):
    return str_time_prop(start, end, '%Y-%m-%d', prop)

def billboard(n, start, end):


    try:
        num_songs = int(n)
        if num_songs > 100:
            num_songs = 100
    except ValueError:
        num_songs = DEF_NUM_SONGS

    try:
        start_year = int(start)
        if start_year < DEF_START_YEAR:
            start_year = DEF_START_YEAR
    except ValueError:
        start_year = DEF_START_YEAR

    try:
        end_year = int(end)
        if end_year > DEF_END_YEAR:
            end_year = DEF_END_YEAR
    except ValueError:
        end_year = DEF_END_YEAR

    if start_year > end_year:
        start_year = end_year

    start_date = str(start_year) + DEF_DATE

    if end_year != DEF_END_YEAR:
        if end_year == start_year:
            end_date = str(end_year) + DEF_SAME_YEAR_DATE
        else:
            end_date = str(end_year) + DEF_DATE
    else:
        end_date = str(end_year) + DEF_DATE_2019

    date = randate(start_date, end_date, random.random())

    chart = charts.ChartData('hot-100', date=date, fetch=True, timeout=10)

    chartdata = {
        'date':date,
        'songs':[]
    }

    i = 0
    for song in chart:
        chartdata['songs'].append(
            {
                'title':song.title,
                'artist':song.artist,
                'rank':song.rank
            }
        )
        i += 1

        if i >= num_songs:
            break

    return chartdata

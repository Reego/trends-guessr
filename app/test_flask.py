import pytest
from app import create_app

from flask import Flask

@pytest.fixture
def client():
    flask_app = create_app({
        'TESTING':True
    }
    )
    # Flask.app.config['TESTING'] = True

    with flask_app.test_client() as client:
        yield client

def test_404(client):

    rv = client.get('/')
    assert rv.status_code == 404

def test_chart_api(client):

    rv = client.get('/chart/5')
    data = rv.get_json()
    assert rv.status_code == 200 and len(data['songs']) == 5

def test_chart_api_invalid_start(client):

    rv = client.get('/chart/5?from=1950')
    data = rv.get_json()
    assert rv.status_code == 200 and len(data['songs']) == 5

def test_chart_api_invalid_end(client):

    rv = client.get('/chart/5?to=2030')
    data = rv.get_json()
    assert rv.status_code == 200 and len(data['songs']) == 5

def test_chart_api_invalid_song_num(client):

    rv = client.get('/chart/150')
    data = rv.get_json()
    assert rv.status_code == 200 and len(data['songs']) == 100

def test_chart_api_same_year(client):

    rv = client.get('/chart/5?from=2010&to=2010')
    data = rv.get_json()
    assert rv.status_code == 200 and len(data['songs']) == 5 and data['data'].split('-')[0] == '2010'


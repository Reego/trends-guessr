from flask import Flask
from flask_cors import CORS

def create_app(config=None):
    app = Flask(__name__)
    CORS(app, resources={
        r"/chart/*":
        {
            'origins':'http://localhost:3000'
        }
    })

    if not config:
        app.config.from_object('config.Config')
    else:
        app.config.update(config)

    print(app.config['DEBUG'])

    from app.api import bp
    app.register_blueprint(bp)

    return app

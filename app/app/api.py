from flask import Blueprint, jsonify, request
import app.querybillboard as qbb

bp = Blueprint('api', __name__, url_prefix='/chart')

# n - number of questions
@bp.route('/<int:n>', methods=['GET'])
def billboard(n):

    year_from = request.args.get('from') or '1960'
    year_to = request.args.get('to') or '2019'

    # get trends
    results = qbb.billboard(n, year_from, year_to)

    return jsonify(results)

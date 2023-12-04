from flask import request, jsonify, Flask
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = sqlite3.connect('data.sqlite')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/stadiums')
def getStadiums():
    conn = get_db_connection()
    stadiums = conn.execute('SELECT * FROM stadium').fetchall()
    conn.close()

    stadiums_list = [dict(row) for row in stadiums]

    # Return the result as JSON
    return jsonify(stadiums_list)

@app.route('/stadiums/<column>/<dir>')
def getStadiumsSorted(column, dir):
    conn = get_db_connection()
    query = f'SELECT * FROM stadium ORDER BY {column} {dir}'
    stadiums = conn.execute(query).fetchall()
    conn.close()

    stadiums_list = [dict(row) for row in stadiums]

    # Return the result as JSON
    return jsonify(stadiums_list)

@app.route('/teamStats')
def getTeamStats():
    conn = get_db_connection()
    teamStats = conn.execute('SELECT DISTINCT t_name, ts_wins, ts_losses, tr_rank FROM teamStats, team, teamrankings WHERE t_name = ts_name AND t_name = tr_name').fetchall()
    conn.close()

    teamStats_list = [dict(row) for row in teamStats]

    # Return the result as JSON
    return jsonify(teamStats_list)

@app.route('/teamStats/<column>/<dir>')
def getTeamStatsSorted(column, dir):
    conn = get_db_connection()
    query = f'SELECT DISTINCT t_name, ts_wins, ts_losses, tr_rank FROM teamStats, team, teamrankings WHERE t_name = ts_name AND t_name = tr_name ORDER BY {column} {dir}'
    teamStats = conn.execute(query).fetchall()
    conn.close()

    teamStats_list = [dict(row) for row in teamStats]

    # Return the result as JSON
    return jsonify(teamStats_list)


if __name__ == "__main__":
    app.run()

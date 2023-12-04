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

@app.route('/seasons')
def getSeasons():
    conn = get_db_connection()
    seasons = conn.execute('SELECT * FROM seasons').fetchall()
    conn.close()

    seasons_list = [dict(row) for row in seasons]

    # Return the result as JSON
    return jsonify(seasons_list)

@app.route('/seasons/<column>/<dir>')
def getSeasonsSorted(column, dir):
    conn = get_db_connection()
    query = f'SELECT * FROM seasons ORDER BY {column} {dir}'
    seasons = conn.execute(query).fetchall()
    conn.close()

    seasons_list = [dict(row) for row in seasons]

    # Return the result as JSON
    return jsonify(seasons_list)

@app.route('/playerStats')
def getPlayerStats():
    conn = get_db_connection()
    playerStats = conn.execute('SELECT DISTINCT p_name, p_teamName, p_year, p_number, ps_weight, ps_height, ps_position FROM player, playerStats WHERE p_name = ps_name GROUP BY p_name').fetchall()
    conn.close()

    playerStats_list = [dict(row) for row in playerStats]

    # Return the result as JSON
    return jsonify(playerStats_list)

@app.route('/playerStats/<column>/<dir>')
def getPlayerStatsSorted(column, dir):
    conn = get_db_connection()
    query = f'SELECT p_name, p_teamName, p_year, p_number, ps_weight, ps_height, ps_position FROM player, playerStats WHERE p_name = ps_name GROUP BY p_name ORDER BY {column} {dir} '
    playerStats = conn.execute(query).fetchall()
    conn.close()

    playerStats_list = [dict(row) for row in playerStats]

    # Return the result as JSON
    return jsonify(playerStats_list)

if __name__ == "__main__":
    app.run()

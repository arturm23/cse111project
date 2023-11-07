.headers on 
SELECT * 
FROM playerstats
ORDER BY ps_height;

SELECT * 
FROM playerstats
ORDER BY ps_height DESC;


SELECT p_name, p_year, ps_height
FROM player, playerstats 
WHERE p_name = ps_name;

-- player, what teams they have played for, and their position at the team
SELECT p_name, p_teamName, ps_position
FROM player, playerstats
WHERE p_name = ps_name
AND p_name = 'player1';

-- display players and their teams throughout the years
SELECT DISTINCT(p_name), t_name
FROM player, team
WHERE p_teamName = t_name;

-- output the teams that have sunny stadiums
SELECT DISTINCT(t_name), st_stadiumName, st_weather, st_capacity
FROM team, stadium
WHERE t_name = st_teamName
AND st_weather = 'sunny';

-- output the dates of the games where team1 played team2
SELECT g_date
FROM game
WHERE g_home = 'team1'
AND g_away = 'team2';

-- sort stadiums by capacity
SELECT st_stadiumName, st_capacity
FROM stadium
ORDER BY st_capacity DESC;

-- output the seasons in our database and the winners
SELECT *
FROM seasons;

-- "complicated" queries 
-- output the players of the best team and their stats
SELECT DISTINCT(p_name), p_teamName, ps_height, ps_weight, ps_position, tr_rank
FROM player, playerstats, team, teamrankings
WHERE ps_name = p_name
AND p_teamName = t_name
AND tr_name = t_name
AND tr_rank = 1;

-- output the players, and all of their "home" stadiums, 
--along with their stats
SELECT DISTINCT(p_name), st_stadiumName, st_weather, st_capacity
FROM player, team, stadium
WHERE t_name = p_teamName
AND t_name = st_teamName;

-- output players and how many wins they had at each team
SELECT DISTINCT(p_name), t_name, ts_wins
FROM player, playerStats, team, teamStats
WHERE p_name = ps_name
AND p_teamName = t_name
AND ts_name = t_name;
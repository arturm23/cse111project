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
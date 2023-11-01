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
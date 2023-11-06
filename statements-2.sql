BEGIN;

    INSERT INTO Player (p_name, p_teamName, p_year)
    VALUES ('John Doe', 'Team2', '2022'); -- create a new player named john doe on team2 in 2022

COMMIT;

SELECT * from Player where p_name = 'John Doe'; -- demonstrate that his data made it into the table

BEGIN;
    INSERT INTO PlayerStats (ps_name, ps_height, ps_weight, ps_position)
    VALUES ('John Doe', '6', 200, 'linebacker'); -- give John doe some stats
COMMIT;

select * from PlayerStats where ps_name = 'John Doe'; -- demonstrate that his stats made it into the table

BEGIN;
    UPDATE PlayerStats SET ps_height = '7' WHERE ps_name = 'John Doe'; -- maybe we got his height wrong in the last query, update his height.
COMMIT;


SELECT * FROM PlayerStats as ps
    join Player as p on p.p_name = ps.ps_name
WHERE ps.ps_name = 'John Doe'; -- get all of John Doe's stats


BEGIN;
    INSERT INTO PlayerToTeam (pname, tname) 
    VALUES ('John Doe', 'Team2'); -- add John Doe to Team2 and establish many to many relationship
COMMIT;


BEGIN;
    DELETE from PlayerStats WHERE ps_name = 'John Doe'; -- delete all of John Doe's stats
    DELETE from Player WHERE p_name = 'John Doe'; -- delete John Doe
    DELETE from PlayerToTeam WHERE pname = 'John Doe'; -- delete John Doe from the many to many table
COMMIT;

select * from PlayerStats where ps_name = 'John Doe'; -- demonstrate that his stats are gone

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
WHERE ps_name = 'John Doe'; -- get all of John Doe's stats


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


BEGIN;

DELETE FROM Player WHERE p_name IN (
    SELECT ps_name FROM PlayerStats WHERE ps_height > '6'
);

DELETE FROM PlayerStats WHERE ps_height > '6'; -- delete every Player from the database that is taller than 6 feet in order to create a league that is 6 feet or shorter. 

COMMIT;

select * from PlayerStats; -- demonstrate that all players taller than 6 feet are gone

BEGIN;
    UPDATE PlayerStats SET ps_height = '6' WHERE ps_height = '5'; -- we'll say that there was a database error and all players that were 5 feet tall are now 6 feet tall
COMMIT;
select * from PlayerStats; -- demonstrate that all players that were 5 feet tall are now 6 feet tall

BEGIN;
    INSERT INTO Player (p_name, p_teamName, p_year)
    VALUES ('Joe King', 'Team1', '2023'); -- create a new player named Joe King on Team1 in 2023

    INSERT INTO PlayerStats (ps_name, ps_height, ps_weight, ps_position)
    VALUES ('Joe King', '7', '190', 'Tackle'); -- give Joe King some stats

    INSERT INTO PlayerToTeam (pname, tname) 
    VALUES ('Joe King', 'Team1'); -- add Joe King to Team1 and establish many to many relationship
COMMIT;

SELECT * from Player where p_name = 'Joe King'; -- demonstrate that his data made it into the table
SELECT * from PlayerStats where ps_name = 'Joe King'; -- demonstrate that his stats made it into the table

BEGIN;
UPDATE PlayerStats SET ps_height = '6' WHERE ps_name = 'Joe King'; -- maybe we made a mistake taking joe king's height, update his height.
COMMIT;
SELECT * from PlayerStats where ps_name = 'Joe King'; -- demonstrate that his stats made it into the table

BEGIN;
    DELETE from PlayerStats WHERE ps_name = 'Joe King'; -- delete all of Joe King's stats
    DELETE from Player WHERE p_name = 'Joe King'; -- delete Joe King
    DELETE from PlayerToTeam WHERE pname = 'Joe King'; -- delete Joe King from the many to many table
COMMIT;

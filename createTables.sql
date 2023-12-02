DROP TABLE IF EXISTS Player;
DROP TABLE IF EXISTS PlayerStats;
DROP TABLE IF EXISTS Team;
DROP TABLE IF EXISTS TeamStats;
DROP TABLE IF EXISTS TeamRankings;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Stadium;

CREATE TABLE Player (
    p_name   varchar(255) not null,
    p_teamName   varchar(255) not null,
    p_year   varchar(255) not null,
    p_number varchar(255) not null
);

CREATE TABLE PlayerStats (
    ps_name   varchar(255) not null,
    ps_height  varchar(255) not null,
    ps_weight varchar(255) not null,
    ps_position  varchar(255) not null
);

CREATE TABLE Team (
    t_name   varchar(255) not null,
    t_year   varchar(255) not null
);

CREATE TABLE TeamStats (
    ts_name   varchar(255) not null,
    ts_wins   varchar(255) not null,
    ts_losses varchar(255) not null
);

CREATE TABLE TeamRankings (
    tr_name   varchar(255) not null,
    tr_rank   varchar(255)
);

CREATE TABLE Seasons (
    s_year   varchar(255) not null,
    s_winner varchar(255) not null
);


CREATE TABLE Stadium (
    st_teamName   varchar(255) not null,
    st_stadiumName   varchar(255) not null,
    st_capacity varchar(255) not null,
    st_surface varchar(255) not null
);

-- CREATE TABLE playerToTeam (
--     pname varchar(255) not null,
--     tname varchar(255) not null
-- )

-- CREATE TABLE teamToSeason (
--     tts_year varchar(255) not null,
--     tts_tname varchar(255) not null
-- )


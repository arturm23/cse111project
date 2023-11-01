.mode "csv"
.separator ","
.headers off
.import '| tail -n +1 data/game.tbl' game
.import '| tail -n +1 data/player.tbl' player
.import '| tail -n +1 data/playerstats.tbl' playerstats
.import '| tail -n +1 data/seasons.tbl' seasons
.import '| tail -n +1 data/stadium.tbl' stadium
.import '| tail -n +1 data/team.tbl' team
.import '| tail -n +1 data/teamrankings.tbl' teamrankings
.import '| tail -n +1 data/teamstats.tbl' teamstats

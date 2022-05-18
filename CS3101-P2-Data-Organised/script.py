import csv

with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/player.csv', newline='') as player_csvfile:
    playerData = list(csv.reader(player_csvfile))
with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/player_phone.csv', newline='') as player_phone_csvfile:
    playerPhoneData = list(csv.reader(player_phone_csvfile))
with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/venue.csv', newline='') as venue_csvfile:
    venueData = list(csv.reader(venue_csvfile))
with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/court.csv', newline='') as court_csvfile:
    courtData = list(csv.reader(court_csvfile))
with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/league.csv', newline='') as league_csvfile:
    leagueData = list(csv.reader(league_csvfile))
with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/league_player.csv', newline='') as league_player_csvfile:
    leaguePlayerData = list(csv.reader(league_player_csvfile))
with open('/Users/jordanrowley/Desktop/CS3101-P2-Data-Organised/played_match.csv', newline='') as played_match_csvfile:
    playedMatchData = list(csv.reader(played_match_csvfile))

print("-----player-----\n")

for i in range(len(playerData)):
    if (playerData[i][1] == ''):
        print("insert into player (email, forename, surname, date_of_birth)\nvalues ('" + playerData[i][0] + "', '" + playerData[i][2] + "', '" + playerData[i][3] + "', '" + playerData[i][4] + "');\n")
    else:
        print("insert into player (email, forename, middlenames, surname, date_of_birth)\nvalues ('" + playerData[i][0] + "', '" + playerData[i][1] + "', '" + playerData[i][2] + "', '" + playerData[i][3] + "', '" + playerData[i][4] + "');\n")


for j in range(len(playerPhoneData)):
    print("insert into player_phone (email, phone_number, phone_type)\nvalues ('" + playerPhoneData[j][0] + "', '" + playerPhoneData[j][1] + "', '" + playerPhoneData[j][2] + "');\n")


for k in range(len(venueData)):
    print("insert into venue (name, address)\nvalues ('" + venueData[k][0] + "', '" + venueData[k][1] + "');\n")


for l in range(len(courtData)):
    print("insert into court (number, venue_name)\nvalues (" + courtData[l][0] + ", '" + courtData[l][1] + "');\n")



for m in range(len(leagueData)):
    print("insert into league (name, year, prize_money, winner_email)\nvalues ('" + leagueData[m][0] + "', " + leagueData[m][1] + ", " + leagueData[m][2] + ", '" + leagueData[m][3] + "');\n") 


for n in range(len(leaguePlayerData)):
    print("insert into league_player (email, league_name, league_year)\nvalues ('" + leaguePlayerData[n][0] + "', '" + leaguePlayerData[n][1] + "', " + leaguePlayerData[n][2] + ");\n")


for o in range(len(playedMatchData)):
    print("insert into played_match (id, p1_email, p2_email, p1_games_won, p2_games_won, date_played, court_number, venue_name, league_name, league_year)\nvalues (" + playedMatchData[o][0] + ", '" + playedMatchData[o][1] + "', '" + playedMatchData[o][2] + "', " + playedMatchData[o][3] + ", " + playedMatchData[o][4] + ", '" + playedMatchData[o][5] + "', " + playedMatchData[o][6] + ", '" + playedMatchData[o][7] + "', '" + playedMatchData[o][8] + "', " + playedMatchData[o][9] + ");\n")

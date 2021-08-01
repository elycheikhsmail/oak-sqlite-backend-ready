-- SQLite 
CREATE TABLE IF NOT EXISTS auth_utilisateurs (
	id	INTEGER NOT NULL,
	username	TEXT NOT NULL UNIQUE , 
	password	TEXT NOT NULL, 
	PRIMARY KEY( id )
) ;
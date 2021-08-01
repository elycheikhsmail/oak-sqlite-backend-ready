-- SQLite 
CREATE TABLE IF NOT EXISTS auth_utilisateurs (
	id	INTEGER NOT NULL,
	username	TEXT NOT NULL UNIQUE , 
	password	TEXT NOT NULL, 
	PRIMARY KEY( id )
) ;
CREATE TABLE IF NOT EXISTS objects_objects (
	id	INTEGER,
	objectName	TEXT,
	itemValue TEXT, 
	ownerId INTEGER,
	PRIMARY KEY( id AUTOINCREMENT)
);
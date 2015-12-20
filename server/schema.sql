CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  objectId INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(256) NOT NULL,
  userId INT NOT NULL,
  roomNameId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(), 
  PRIMARY KEY(objectId)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  PRIMARY KEY(id)
);

CREATE TABLE room (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(50),
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


DROP TABLE IF EXISTS `USERS`;

CREATE TABLE `USERS` (
	`id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
	`email` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`familySize` int NOT NULL,
	`maxDist` int NOT NULL,
	`transportOpt` CHAR(1) NOT NULL,
	PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=latin1;

-- Create sample data for user group

INSERT INTO `USERS` VALUES
	(1000, '123@gmail.com', 'password123', 'Jon Smith', '123 Main Street', '4', '100', 'C'),
	(1001, '124@gmail.com', 'password456', 'Jon Adams', '123 South Street', '6', '25', 'B');


DROP TABLE IF EXISTS `LISTS`;

CREATE TABLE `LISTS` (
	`lineID` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
	`userID` int(11)  NOT NULL,
	`listItem` varchar(255) NOT NULL,
	`qty` int NOT NULL,
	`searchURL` varchar(255) NOT NULL,
	PRIMARY KEY (`lineID`),
	FOREIGN KEY (`userID`) REFERENCES `USERS`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Create sample data for LISTS

INSERT INTO `LISTS` VALUES
	(NULL, '1000', 'Peaches', '2', 'www.peaches.com'),
	(NULL, '1000', 'Salmon', '4', 'www.salmon.com'),
	(NULL, '1001', 'Steak', '10', 'www.steak.com'),
	(NULL, '1001', 'Coffee', '200', 'www.coffee.com');





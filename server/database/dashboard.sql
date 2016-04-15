CREATE DATABASE `kukral_dp_dashborad` /*!40100 COLLATE 'utf8_general_ci' */;

CREATE TABLE `widgets` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`settings` TEXT NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

ALTER TABLE `widgets`
	ADD COLUMN `name` CHAR(50) NOT NULL AFTER `id`;

ALTER TABLE `widgets`
	ALTER `name` DROP DEFAULT;
ALTER TABLE `widgets`
	CHANGE COLUMN `name` `type` CHAR(50) NOT NULL AFTER `id`;

/* data */
INSERT INTO `kukral_dp_dashborad`.`widgets` (`type`, `settings`) VALUES ('barchart', '{\r\n	"bars": [\r\n	  [{"data":134, "name": "přihláš."},{"data":94, "name": "přijat."},{"data":88, "name": "zapsa."}],\r\n	  [{"data":121, "name": "přihláš."},{"data":85, "name": "přijat."},{"data":79, "name": "zapsa."}],\r\n	  [{"data":113, "name": "přihláš."},{"data":80, "name": "přijat."},{"data":75, "name": "zapsa."}]\r\n	],\r\n	"unit":"k",\r\n	"grid":"1"\r\n\r\n}');
INSERT INTO `kukral_dp_dashborad`.`widgets` (`type`, `settings`) VALUES ('barchart-another', '{\r\n	"bars": [\r\n	  [{"data":11, "name": "přihláš."},{"data":15, "name": "přijat."},{"data":25, "name": "zapsa."}],\r\n	  [{"data":33, "name": "přihláš."},{"data":66, "name": "přijat."},{"data":55, "name": "zapsa."}],\r\n	  [{"data":12, "name": "přihláš."},{"data":40, "name": "přijat."},{"data":20, "name": "zapsa."}]\r\n	],\r\n	"unit":"k",\r\n	"grid":"1"\r\n}');
INSERT INTO `kukral_dp_dashborad`.`widgets` (`type`, `settings`) VALUES ('barchart-test', '{\r\n  "bars": [\r\n	[{"data":134, "name": "přihláš."},{"data":94, "name": "přijat."},{"data":88, "name": "zapsa."}],\r\n	[{"data":121, "name": "přihláš."},{"data":85, "name": "přijat."},{"data":79, "name": "zapsa."}],\r\n	[{"data":113, "name": "přihláš."},{"data":80, "name": "přijat."},{"data":75, "name": "zapsa."}]\r\n  ],\r\n	"unit":"k",\r\n	"grid":"1",\r\n  	"performanceTest": true,\r\n  	"performanceStart": {\r\n	  "jquery": 2000,\r\n	  "react": 3000,\r\n	  "angular": 3000\r\n	}\r\n}\r\n\r\n');
INSERT INTO `kukral_dp_dashborad`.`widgets` (`type`, `settings`) VALUES ('hightchart', '{\r\n  "serieName": "Testovací serie",\r\n  "data": [\r\n    {"name": "ideas1", "data": 1},\r\n    {"name": "ideas2", "data": 8},\r\n    {"name": "ideas3", "data": 5}\r\n  ]\r\n}');
INSERT INTO `kukral_dp_dashborad`.`widgets` (`type`, `settings`) VALUES ('linechart', '{\r\n  "linechart": {\r\n	"data": [\r\n	  [\r\n		{\r\n		  "X": 2010,\r\n		  "Y": 66,\r\n		  "tip": "Přihlášek 2010 - 331536"\r\n		},\r\n		{\r\n		  "X": 2011,\r\n		  "Y": 66,\r\n		  "tip": "Přihlášek 2011 - 330066"\r\n		},\r\n		{\r\n		  "X": 2012,\r\n		  "Y": 62,\r\n		  "tip": "Přihlášek 2012 - 309452"\r\n		},\r\n		{\r\n		  "X": 2013,\r\n		  "Y": 58,\r\n		  "tip": "Přihlášek 2013 - 290953"\r\n		},\r\n		{\r\n		  "X": 2014,\r\n		  "Y": 52,\r\n		  "tip": "Přihlášek 2014 - 260467"\r\n		},\r\n		{\r\n		  "X": 2015,\r\n		  "Y": 48,\r\n		  "tip": "Přihlášek 2015 - 243718"\r\n		}\r\n	  ],\r\n	  [\r\n		{\r\n		  "X": 2010,\r\n		  "Y": 21,\r\n		  "tip": "Přijatých 2010 - 106437"\r\n		},\r\n		{\r\n		  "X": 2011,\r\n		  "Y": 20,\r\n		  "tip": "Přijatých 2011 - 103761"\r\n		},\r\n		{\r\n		  "X": 2012,\r\n		  "Y": 19,\r\n		  "tip": "Přijatých 2012 - 98261"\r\n		},\r\n		{\r\n		  "X": 2013,\r\n		  "Y": 18,\r\n		  "tip": "Přijatých 2013 - 93714"\r\n		},\r\n		{\r\n		  "X": 2014,\r\n		  "Y": 16,\r\n		  "tip": "Přijatých 2014 - 84765"\r\n		},\r\n		{\r\n		  "X": 2015,\r\n		  "Y": 15,\r\n		  "tip": "Přijatých 2015 - 78137"\r\n		}\r\n	  ]\r\n	],\r\n	"unitX": "",\r\n	"unitY": "k"\r\n  }\r\n}');
INSERT INTO `kukral_dp_dashborad`.`widgets` (`type`, `settings`) VALUES ('pie', '{"piechart": [\r\n	{"val": 2643, "title": "15 - 19 let"},\r\n	{"val": 22165, "title": "20 - 24 let"},\r\n	{"val": 5118, "title": "25 - 29 let"},\r\n	{"val": 785, "title": "30 - 34 let"},\r\n	{"val": 510, "title": "35 - 39 let"},\r\n	{"val": 572, "title": "40 let a starší"}\r\n  ]\r\n}');

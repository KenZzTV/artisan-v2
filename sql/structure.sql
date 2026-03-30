DROP TABLE IF EXISTS `data`;
CREATE TABLE IF NOT EXISTS `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(22) DEFAULT NULL,
  `Spécialité` varchar(12) DEFAULT NULL,
  `Note` varchar(4) DEFAULT NULL,
  `Ville` varchar(16) DEFAULT NULL,
  `A propos` varchar(196) DEFAULT NULL,
  `Email` varchar(38) DEFAULT NULL,
  `Site Web` varchar(38) DEFAULT NULL,
  `Catégorie` varchar(12) DEFAULT NULL,
  `Top` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
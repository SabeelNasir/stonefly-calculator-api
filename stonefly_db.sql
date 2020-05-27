-- MariaDB dump 10.17  Distrib 10.4.6-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: stonefly_db
-- ------------------------------------------------------
-- Server version	10.4.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  `contactNo` varchar(20) NOT NULL,
  `contactName` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'StoneFly','stonefly@gmail.com',' 26250 Eden Landing Rd Hayward, CA 94545 USA','+92304556435','John Ryhnoo','2020-05-26 00:34:38',NULL),(2,'The Walt Disney Company','ergarent@stonefly.com','Disney Land','(510) 265-1122','Donald Duck','2020-05-26 00:39:58','2020-05-27 04:05:37');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `salePrice` double(10,2) NOT NULL DEFAULT 0.00,
  `normalPrice` double(10,2) NOT NULL DEFAULT 0.00,
  `imageName` varchar(100) DEFAULT NULL,
  `imageUrl` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'StoneFly XD-Series Enterprise Appliance, Gen 10, 2U, Supports up to 12 Drives (3.5\" SAS), Part # SFY-XD10-12',400.00,380.50,'1590522203_1590521332_Backup-SAP-HANA.png',NULL,'2020-05-25 22:05:14',1,NULL,1),(7,'StoneFly XD-Series Enterprise Appliance, Gen 10, 2U, Supports up to 12 Drives (3.5\" SAS), Part # SFY-XD10-12',500.00,500.00,'1590519540_1590517816_maxresdefault (1).jpg',NULL,'2020-05-26 23:59:01',1,NULL,NULL),(8,'Veeam Availability Suite',2700.00,2600.00,'1590522930_1590520907_v10_launch_event_preview_600x338_2x.jpg',NULL,'2020-05-27 00:55:43',1,NULL,NULL),(9,'3-Year Veeam Availability Suite Subscription, Per 10-Universal Licenses, Part # SOFVEEVAS10-3YR',6800.00,6500.00,'1590523466_maxresdefault.jpg',NULL,'2020-05-27 01:04:28',1,'2020-05-27 01:05:46',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_detail`
--

DROP TABLE IF EXISTS `quotation_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotation_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quotationId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_quotations_unique` (`quotationId`,`productId`),
  KEY `quotation_detail_products_id_fk` (`productId`),
  CONSTRAINT `quotation_detail_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `quotation_detail_quotations_id_fk` FOREIGN KEY (`quotationId`) REFERENCES `quotations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_detail`
--

LOCK TABLES `quotation_detail` WRITE;
/*!40000 ALTER TABLE `quotation_detail` DISABLE KEYS */;
INSERT INTO `quotation_detail` VALUES (33,37,1,4,'2020-05-26 12:43:55'),(35,39,1,2,'2020-05-26 13:21:56'),(36,40,8,2,'2020-05-27 04:21:31'),(37,40,9,2,'2020-05-27 04:21:31'),(41,40,7,12,'2020-05-27 04:38:05'),(42,39,8,1,'2020-05-27 04:45:14');
/*!40000 ALTER TABLE `quotation_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quoteNo` varchar(50) NOT NULL,
  `companyId` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `totalPrice` double(10,2) NOT NULL,
  `totalDiscount` double(10,2) DEFAULT NULL,
  `totalDiscountedPrice` double(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quotations_companies_fk` (`companyId`),
  CONSTRAINT `quotations_companies_fk` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
INSERT INTO `quotations` VALUES (37,'1590479035276',2,'Quotation Title-updated1',500.00,25500.00,25000.00,'2020-05-26 12:43:55',1,NULL,1),(39,'1590481316094',2,'Quotation Title3',3500.00,250.00,3250.00,'2020-05-26 13:21:56',1,'2020-05-27 04:05:47',1),(40,'1590535291143',2,'StoneFly DR365V™ XD-Series Backup and Disaster Recovery Appliance for Veeam',25000.00,100.00,24900.00,'2020-05-27 04:21:31',1,'2020-05-27 04:05:18',1);
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `userRole` varchar(20) NOT NULL DEFAULT 'User',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','21232f297a57a5a743894a0e4a801fc3','Admin','User','2020-05-25 20:11:49',NULL,'Admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-27  5:05:34

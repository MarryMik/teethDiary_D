CREATE DATABASE  IF NOT EXISTS `teethdiary` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teethdiary`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: teethdiary
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `procedure_data`
--

DROP TABLE IF EXISTS `procedure_data`;
/*!50001 DROP VIEW IF EXISTS `procedure_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `procedure_data` AS SELECT 
 1 AS `idrecord`,
 1 AS `idprocedure`,
 1 AS `partname`,
 1 AS `id_or_cav_part`,
 1 AS `proc_name`,
 1 AS `user_id`,
 1 AS `idtreatment`,
 1 AS `file_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `diary_data`
--

DROP TABLE IF EXISTS `diary_data`;
/*!50001 DROP VIEW IF EXISTS `diary_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `diary_data` AS SELECT 
 1 AS `iddiary`,
 1 AS `owner`,
 1 AS `owner_phone`,
 1 AS `owner_id`,
 1 AS `with_access`,
 1 AS `access_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `all_treatments`
--

DROP TABLE IF EXISTS `all_treatments`;
/*!50001 DROP VIEW IF EXISTS `all_treatments`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `all_treatments` AS SELECT 
 1 AS `iddiary`,
 1 AS `idtreatment`,
 1 AS `treatment_name`,
 1 AS `start_date_trtment`,
 1 AS `end_date_trtment`,
 1 AS `date_difference`,
 1 AS `number_of_records`,
 1 AS `user_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `record_data`
--

DROP TABLE IF EXISTS `record_data`;
/*!50001 DROP VIEW IF EXISTS `record_data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `record_data` AS SELECT 
 1 AS `idtreatment`,
 1 AS `idrecord`,
 1 AS `record_date`,
 1 AS `record_adress`,
 1 AS `rating`,
 1 AS `prescription`,
 1 AS `doctor_name`,
 1 AS `doctor_phone`,
 1 AS `number_of_procedures`,
 1 AS `user_id`,
 1 AS `proc_names`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `procedure_data`
--

/*!50001 DROP VIEW IF EXISTS `procedure_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `procedure_data` AS select `tr`.`idrecord` AS `idrecord`,`pr`.`idprocedure` AS `idprocedure`,group_concat(`o`.`partname` separator ',') AS `partname`,group_concat(`o`.`id_or_cav_part` separator ',') AS `id_or_cav_part`,`prs`.`proc_name` AS `proc_name`,`dd`.`user_id` AS `user_id`,`tt`.`idtreatment` AS `idtreatment`,group_concat(`f`.`file_name` separator ',') AS `file_name` from (((((((`procedure` `pr` left join `procedure_area` `a` on((`pr`.`idprocedure` = `a`.`procedure_id`))) left join `oral_cavity_parts` `o` on((`a`.`or_cav_part_id` = `o`.`id_or_cav_part`))) join `procedures` `prs` on((`pr`.`procedures_id` = `prs`.`idprocedures`))) join `teeth_record` `tr` on((`pr`.`record_id` = `tr`.`idrecord`))) join `treatment` `tt` on((`tr`.`treatment_id` = `tt`.`idtreatment`))) join `diary` `dd` on((`tt`.`diary_id` = `dd`.`iddiary`))) left join `file_ph` `f` on((`pr`.`idprocedure` = `f`.`procedure_id`))) group by `pr`.`idprocedure` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `diary_data`
--

/*!50001 DROP VIEW IF EXISTS `diary_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `diary_data` AS select `dr`.`iddiary` AS `iddiary`,`u`.`username` AS `owner`,`u`.`phone` AS `owner_phone`,`u`.`iduser` AS `owner_id`,`us`.`username` AS `with_access`,`us`.`iduser` AS `access_id` from (((`diary` `dr` left join `user` `u` on((`dr`.`user_id` = `u`.`iduser`))) left join `access` `a` on((`dr`.`iddiary` = `a`.`diary_id`))) left join `user` `us` on((`a`.`user_id` = `us`.`iduser`))) where (`dr`.`diary_type` = 'Щоденник пацієнта') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_treatments`
--

/*!50001 DROP VIEW IF EXISTS `all_treatments`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_treatments` AS select `d`.`iddiary` AS `iddiary`,`tt`.`idtreatment` AS `idtreatment`,`tt`.`treatment_name` AS `treatment_name`,`tt`.`start_date_trtment` AS `start_date_trtment`,`tt`.`end_date_trtment` AS `end_date_trtment`,(to_days(`tt`.`end_date_trtment`) - to_days(`tt`.`start_date_trtment`)) AS `date_difference`,count(`tr`.`idrecord`) AS `number_of_records`,`d`.`user_id` AS `user_id` from ((`treatment` `tt` left join `teeth_record` `tr` on((`tt`.`idtreatment` = `tr`.`treatment_id`))) join `diary` `d` on((`tt`.`diary_id` = `d`.`iddiary`))) group by `tt`.`idtreatment` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `record_data`
--

/*!50001 DROP VIEW IF EXISTS `record_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `record_data` AS select `tt`.`idtreatment` AS `idtreatment`,`tr`.`idrecord` AS `idrecord`,`tr`.`record_date` AS `record_date`,`tr`.`record_adress` AS `record_adress`,`tr`.`rating` AS `rating`,`tr`.`prescription` AS `prescription`,`d`.`doctor_name` AS `doctor_name`,`d`.`doctor_phone` AS `doctor_phone`,count(`pr`.`idprocedure`) AS `number_of_procedures`,`dd`.`user_id` AS `user_id`,group_concat(`prs`.`proc_name` separator ';') AS `proc_names` from (((((`teeth_record` `tr` left join `procedure` `pr` on((`tr`.`idrecord` = `pr`.`record_id`))) left join `procedures` `prs` on((`pr`.`procedures_id` = `prs`.`idprocedures`))) join `doctor_info` `d` on((`tr`.`doctor_id` = `d`.`id_doctor`))) join `treatment` `tt` on((`tr`.`treatment_id` = `tt`.`idtreatment`))) join `diary` `dd` on((`tt`.`diary_id` = `dd`.`iddiary`))) group by `tr`.`idrecord` order by `tr`.`record_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09  0:20:51

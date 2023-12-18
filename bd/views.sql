CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `teethdiary`.`all_treatments` AS
    SELECT 
        `d`.`iddiary` AS `iddiary`,
        `tt`.`idtreatment` AS `idtreatment`,
        `tt`.`treatment_name` AS `treatment_name`,
        `tt`.`start_date_trtment` AS `start_date_trtment`,
        `tt`.`end_date_trtment` AS `end_date_trtment`,
        (TO_DAYS(`tt`.`end_date_trtment`) - TO_DAYS(`tt`.`start_date_trtment`)) AS `date_difference`,
        COUNT(`tr`.`idrecord`) AS `number_of_records`,
        `d`.`user_id` AS `user_id`
    FROM
        ((`teethdiary`.`treatment` `tt`
        LEFT JOIN `teethdiary`.`teeth_record` `tr` ON ((`tt`.`idtreatment` = `tr`.`treatment_id`)))
        JOIN `teethdiary`.`diary` `d` ON ((`tt`.`diary_id` = `d`.`iddiary`)))
    GROUP BY `tt`.`idtreatment`


CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `teethdiary`.`diary_data` AS
    SELECT 
        `dr`.`iddiary` AS `iddiary`,
        `u`.`username` AS `owner`,
        `u`.`phone` AS `owner_phone`,
        `u`.`iduser` AS `owner_id`,
        `us`.`username` AS `with_access`,
        `us`.`iduser` AS `access_id`
    FROM
        (((`teethdiary`.`diary` `dr`
        LEFT JOIN `teethdiary`.`user` `u` ON ((`dr`.`user_id` = `u`.`iduser`)))
        LEFT JOIN `teethdiary`.`access` `a` ON ((`dr`.`iddiary` = `a`.`diary_id`)))
        LEFT JOIN `teethdiary`.`user` `us` ON ((`a`.`user_id` = `us`.`iduser`)))
    WHERE
        (`dr`.`diary_type` = 'Щоденник пацієнта')



CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `teethdiary`.`procedure_data` AS
    SELECT 
        `tr`.`idrecord` AS `idrecord`,
        `pr`.`idprocedure` AS `idprocedure`,
        GROUP_CONCAT(`o`.`partname`
            SEPARATOR ',') AS `partname`,
        GROUP_CONCAT(`o`.`id_or_cav_part`
            SEPARATOR ',') AS `id_or_cav_part`,
        `prs`.`proc_name` AS `proc_name`,
        `dd`.`user_id` AS `user_id`,
        `tt`.`idtreatment` AS `idtreatment`,
        GROUP_CONCAT(`f`.`file_name`
            SEPARATOR ',') AS `file_name`
    FROM
        (((((((`teethdiary`.`procedure` `pr`
        LEFT JOIN `teethdiary`.`procedure_area` `a` ON ((`pr`.`idprocedure` = `a`.`procedure_id`)))
        LEFT JOIN `teethdiary`.`oral_cavity_parts` `o` ON ((`a`.`or_cav_part_id` = `o`.`id_or_cav_part`)))
        JOIN `teethdiary`.`procedures` `prs` ON ((`pr`.`procedures_id` = `prs`.`idprocedures`)))
        JOIN `teethdiary`.`teeth_record` `tr` ON ((`pr`.`record_id` = `tr`.`idrecord`)))
        JOIN `teethdiary`.`treatment` `tt` ON ((`tr`.`treatment_id` = `tt`.`idtreatment`)))
        JOIN `teethdiary`.`diary` `dd` ON ((`tt`.`diary_id` = `dd`.`iddiary`)))
        LEFT JOIN `teethdiary`.`file_ph` `f` ON ((`pr`.`idprocedure` = `f`.`procedure_id`)))
    GROUP BY `pr`.`idprocedure`


CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `teethdiary`.`record_data` AS
    SELECT 
        `tt`.`idtreatment` AS `idtreatment`,
        `tr`.`idrecord` AS `idrecord`,
        `tr`.`record_date` AS `record_date`,
        `tr`.`record_adress` AS `record_adress`,
        `tr`.`rating` AS `rating`,
        `tr`.`prescription` AS `prescription`,
        `d`.`doctor_name` AS `doctor_name`,
        `d`.`doctor_phone` AS `doctor_phone`,
        COUNT(`pr`.`idprocedure`) AS `number_of_procedures`,
        `dd`.`user_id` AS `user_id`,
        GROUP_CONCAT(`prs`.`proc_name`
            SEPARATOR ';') AS `proc_names`
    FROM
        (((((`teethdiary`.`teeth_record` `tr`
        LEFT JOIN `teethdiary`.`procedure` `pr` ON ((`tr`.`idrecord` = `pr`.`record_id`)))
        LEFT JOIN `teethdiary`.`procedures` `prs` ON ((`pr`.`procedures_id` = `prs`.`idprocedures`)))
        JOIN `teethdiary`.`doctor_info` `d` ON ((`tr`.`doctor_id` = `d`.`id_doctor`)))
        JOIN `teethdiary`.`treatment` `tt` ON ((`tr`.`treatment_id` = `tt`.`idtreatment`)))
        JOIN `teethdiary`.`diary` `dd` ON ((`tt`.`diary_id` = `dd`.`iddiary`)))
    GROUP BY `tr`.`idrecord`
    ORDER BY `tr`.`record_date`
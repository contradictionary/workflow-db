delimiter #
CREATE FUNCTION nextval (seq_name varchar(100))  
  RETURNS bigint(20)  
    READS SQL DATA  
  NOT DETERMINISTIC  
    BEGIN  
     DECLARE workval bigint(20);  
     SELECT count(1) into workval  
        FROM appsequence  
        WHERE sequencename = seq_name;  
     IF workval <> 1 THEN  
        DELETE  
            FROM appsequence  
            WHERE sequencename = seq_name;  
        INSERT  
            INTO appsequence (sequencename, sequenceval,sequencestep,createdon)  
            VALUES (seq_name, 1, 1,current_timestamp());  
     END IF;
     SELECT sequenceval into workval  
        FROM appsequence  
        WHERE sequencename = seq_name;  
     UPDATE appsequence  
        SET sequenceval = sequenceval + sequencestep,
            modifiedon = current_timestamp()
        WHERE sequencename = seq_name;  
     RETURN workval;
    END#
delimiter ;
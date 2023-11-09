select * from school_data sd 

SET foreign_key_checks = 0;
TRUNCATE TABLE school_data;
SET foreign_key_checks = 1;


DESCRIBE school_data;

ALTER TABLE school_data
	DROP COLUMN school_0_type;
    DROP COLUMN school_0_name,
    DROP COLUMN school_0_rating,
    DROP COLUMN school_0_distance,
    DROP COLUMN school_0_link,
    DROP COLUMN school_0_level,
    DROP COLUMN school_0_grades,
    DROP COLUMN school_1_name,
    DROP COLUMN school_1_rating,
    DROP COLUMN school_1_distance,
    DROP COLUMN school_1_link,
    DROP COLUMN school_1_level,
    DROP COLUMN school_1_grades,
    DROP COLUMN school_1_type,
    DROP COLUMN school_2_name,
    DROP COLUMN school_2_rating,
    DROP COLUMN school_2_distance,
    DROP COLUMN school_2_link,
    DROP COLUMN school_2_level,
    DROP COLUMN school_2_grades,
    DROP COLUMN school_2_type;

    
    
    



















school_2_type
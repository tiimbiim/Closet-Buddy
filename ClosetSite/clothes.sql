DROP DATABASE IF EXISTS clothes;
CREATE DATABASE clothes;
USE clothes;

CREATE TABLE clothes.shirt
(

    name varchar(10),
    value varchar(10),
    PRIMARY KEY (name)

)
DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS (
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    poder text NOT NULL
);

-- CREATE
INSERT INTO TB_HEROIS (nome, poder)
VALUES ('Flash', 'Velocidade'), ('Aquaman', 'Falar com os animais'), ('Batman', 'Dinheiro');

-- READ
SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE nome = 'Flash';

-- UPDATE
UPDATE TB_HEROIS
SET nome = 'Flash2' WHERE nome = 'Flash';

-- DELETE
DELETE FROM TB_HEROIS WHERE id = 2;
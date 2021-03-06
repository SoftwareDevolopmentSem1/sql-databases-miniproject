CREATE OR REPLACE PROCEDURE add_client(
    name VARCHAR(30), birth DATE, car INTEGER, interview_start TIMESTAMP
)
LANGUAGE PLPGSQL AS $$
DECLARE
    age INTEGER;
    client_id INTEGER;
    emp_id INTEGER;
BEGIN
    age := EXTRACT(YEAR FROM age(birth));
    RAISE NOTICE 'the age is %', age;

    IF age >= 18 THEN
        -- counts pr full hour
        emp_id := (SELECT emp FROM admin_staff_work WHERE start != interview_start LIMIT 1);
        RAISE NOTICE 'emp_id:: %', emp_id;

        IF emp_id > -1 THEN
            INSERT INTO clients (name, birth, instructor, car)
            VALUES (name, birth, emp_id, car)
            RETURNING client INTO client_id;

            INSERT INTO interviews (employee, client, start)
            VALUES (emp_id, client_id, interview_start);
        ELSE
            RAISE NOTICE 'There is no avaiable employees at that time';
        END IF;

    ELSE RAISE NOTICE 'Too young to drive';
    END IF;
END;
$$;
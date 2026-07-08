SELECT COUNT(*) AS total_patients
FROM patients;
SELECT COUNT(*) AS total_doctors
FROM doctors;
SELECT COUNT(*) AS total_beds
FROM beds;
SELECT
status,
COUNT(*) total
FROM beds
GROUP BY status;
SELECT
SUM(treatment_cost) AS total_revenue
FROM admissions;
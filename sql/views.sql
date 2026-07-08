-- ==========================================
-- HospitalIQ AI Database Views
-- ==========================================

-- ==========================================
-- 1. Patient Summary
-- ==========================================

CREATE OR REPLACE VIEW patient_summary AS

SELECT

    p.id AS patient_id,
    p.name,
    p.age,
    p.gender,
    p.city,

    dis.name AS disease,
    dis.severity,

    dep.name AS department,

    doc.name AS doctor,
    doc.shift,

    b.bed_type,

    a.admission_date,
    a.discharge_date,
    (a.discharge_date - a.admission_date) AS stay_days,

    a.emergency,
    a.treatment_cost

FROM admissions a

JOIN patients p
ON a.patient_id = p.id

JOIN diseases dis
ON p.disease_id = dis.id

JOIN departments dep
ON a.department_id = dep.id

JOIN doctors doc
ON a.doctor_id = doc.id

JOIN beds b
ON a.bed_id = b.id;

------------------------------------------------------------

-- ==========================================
-- 2. Department Summary
-- ==========================================

CREATE OR REPLACE VIEW department_summary AS

SELECT

    dep.id,
    dep.name,

    COUNT(a.id) AS total_admissions,

    SUM(a.treatment_cost) AS revenue,

    AVG(a.treatment_cost) AS avg_cost,

    AVG(
        a.discharge_date - a.admission_date
    ) AS avg_stay

FROM departments dep

LEFT JOIN admissions a
ON dep.id = a.department_id

GROUP BY dep.id, dep.name;

------------------------------------------------------------

-- ==========================================
-- 3. Doctor Summary
-- ==========================================

CREATE OR REPLACE VIEW doctor_summary AS

SELECT

    d.id,
    d.name,
    d.shift,
    d.experience,

    COUNT(a.id) AS patients_handled,

    SUM(a.treatment_cost) AS revenue_generated

FROM doctors d

LEFT JOIN admissions a
ON d.id = a.doctor_id

GROUP BY
d.id,
d.name,
d.shift,
d.experience;

------------------------------------------------------------

-- ==========================================
-- 4. Bed Summary
-- ==========================================

CREATE OR REPLACE VIEW bed_summary AS

SELECT

department_id,

status,

COUNT(*) AS beds

FROM beds

GROUP BY
department_id,
status;

------------------------------------------------------------

-- ==========================================
-- 5. Disease Summary
-- ==========================================

CREATE OR REPLACE VIEW disease_summary AS

SELECT

dis.id,

dis.name,

dis.severity,

COUNT(p.id) AS patients,

AVG(a.treatment_cost) AS average_cost,

AVG(
    a.discharge_date-a.admission_date
) AS average_stay

FROM diseases dis

LEFT JOIN patients p
ON dis.id = p.disease_id

LEFT JOIN admissions a
ON p.id = a.patient_id

GROUP BY

dis.id,
dis.name,
dis.severity;
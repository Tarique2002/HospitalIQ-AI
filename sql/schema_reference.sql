-- ==========================================
-- HospitalIQ AI Database Schema Reference
-- ==========================================

-- departments
(id, name, floor, total_beds)

-- diseases
(id, name, severity, average_stay_days)

-- doctors
(id, name, department_id, experience, shift)

-- beds
(id, department_id, bed_type, status)

-- patients
(id, name, age, gender, city, disease_id)

-- admissions
(
id,
patient_id,
doctor_id,
department_id,
bed_id,
admission_date,
discharge_date,
emergency,
treatment_cost
)
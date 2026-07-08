# ============================================
# HospitalIQ AI Configuration
# ============================================

DISEASES = {

    "Heart Attack": {
        "department": "Cardiology",
        "severity": "Critical",
        "stay_days": (7, 12),
        "cost": (250000, 500000),
        "emergency_probability": 0.95
    },

    "Hypertension": {
        "department": "Cardiology",
        "severity": "Medium",
        "stay_days": (2, 4),
        "cost": (15000, 50000),
        "emergency_probability": 0.15
    },

    "Stroke": {
        "department": "Neurology",
        "severity": "Critical",
        "stay_days": (10, 18),
        "cost": (300000, 600000),
        "emergency_probability": 0.90
    },

    "Migraine": {
        "department": "Neurology",
        "severity": "Low",
        "stay_days": (1, 2),
        "cost": (5000, 15000),
        "emergency_probability": 0.05
    },

    "Fracture": {
        "department": "Orthopedics",
        "severity": "Medium",
        "stay_days": (5, 10),
        "cost": (50000, 150000),
        "emergency_probability": 0.20
    },

    "Cancer": {
        "department": "Oncology",
        "severity": "Critical",
        "stay_days": (20, 35),
        "cost": (600000, 1200000),
        "emergency_probability": 0.40
    },

    "Pneumonia": {
        "department": "Emergency",
        "severity": "High",
        "stay_days": (5, 8),
        "cost": (50000, 150000),
        "emergency_probability": 0.70
    },

    "COVID-19": {
        "department": "Emergency",
        "severity": "High",
        "stay_days": (7, 14),
        "cost": (100000, 300000),
        "emergency_probability": 0.80
    },

    "Dengue": {
        "department": "Emergency",
        "severity": "High",
        "stay_days": (5, 7),
        "cost": (40000, 90000),
        "emergency_probability": 0.75
    },

    "Malaria": {
        "department": "Emergency",
        "severity": "Medium",
        "stay_days": (4, 6),
        "cost": (25000, 70000),
        "emergency_probability": 0.45
    },

    "Appendicitis": {
        "department": "Surgery",
        "severity": "High",
        "stay_days": (3, 5),
        "cost": (80000, 180000),
        "emergency_probability": 0.85
    },

    "Burn Injury": {
        "department": "Emergency",
        "severity": "Critical",
        "stay_days": (12, 25),
        "cost": (300000, 900000),
        "emergency_probability": 0.95
    }
}
def get_recommendation(predicted_occupancy: float):

    if predicted_occupancy >= 90:
        return {
            "risk_level": "Critical",
            "recommendations": [
                "Increase ICU bed capacity immediately.",
                "Deploy additional nursing staff.",
                "Delay elective admissions.",
                "Alert hospital administration."
            ]
        }

    elif predicted_occupancy >= 75:
        return {
            "risk_level": "High",
            "recommendations": [
                "Prepare additional beds.",
                "Increase staff availability.",
                "Monitor admissions every hour."
            ]
        }

    elif predicted_occupancy >= 50:
        return {
            "risk_level": "Medium",
            "recommendations": [
                "Current occupancy is stable.",
                "Continue monitoring patient flow."
            ]
        }

    else:
        return {
            "risk_level": "Low",
            "recommendations": [
                "Hospital capacity is healthy.",
                "No immediate operational action required."
            ]
        }
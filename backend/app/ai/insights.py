def generate_insights(
    revenue_growth: float,
    occupancy: float,
    satisfaction: float,
):

    summary = []

    recommendations = []

    risk = "Low"

    confidence = 94

    # -------------------------
    # Revenue
    # -------------------------

    if revenue_growth >= 10:

        summary.append(
            f"Revenue increased by {revenue_growth:.1f}% this month."
        )

    else:

        summary.append(
            "Revenue growth is below target."
        )

        recommendations.append(
            "Review billing efficiency."
        )

    # -------------------------
    # Occupancy
    # -------------------------

    if occupancy >= 85:

        risk = "High"

        summary.append(
            "Hospital occupancy is critically high."
        )

        recommendations.extend([
            "Increase ICU staffing.",
            "Prepare overflow beds.",
            "Delay elective surgeries.",
        ])

    elif occupancy >= 70:

        risk = "Medium"

        summary.append(
            "Occupancy is approaching capacity."
        )

        recommendations.extend([
            "Monitor bed availability.",
            "Prepare additional staff.",
        ])

    else:

        summary.append(
            "Hospital occupancy is healthy."
        )

    # -------------------------
    # Satisfaction
    # -------------------------

    if satisfaction < 80:

        recommendations.append(
            "Improve patient experience."
        )

    else:

        summary.append(
            "Patient satisfaction remains excellent."
        )

    if not recommendations:

        recommendations.append(
            "Maintain current operational strategy."
        )

    return {
        "summary": " ".join(summary),
        "risk": risk,
        "confidence": confidence,
        "recommendations": recommendations,
    }
from app.ml.predict import predict_bed_occupancy

result = predict_bed_occupancy(
    department_id=1,
    occupied_beds=45,
    emergency_cases=10,
    total_beds=60,
    day_of_week=2,
    month=7
)

print(result)
from sklearn.linear_model import LinearRegression
import numpy as np


def predict_next(values: list[float]):

    if len(values) < 2:
        return values[-1] if values else 0

    X = np.arange(len(values)).reshape(-1, 1)

    y = np.array(values)

    model = LinearRegression()

    model.fit(X, y)

    prediction = model.predict(
        np.array([[len(values)]])
    )[0]

    return float(round(prediction, 2))
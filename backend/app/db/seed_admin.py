from app.db.database import SessionLocal
from app.models.user import User
from app.auth.password import hash_password


def seed_admin():

    db = SessionLocal()

    admin = (
        db.query(User)
        .filter(User.email == "admin@hospitaliq.ai")
        .first()
    )

    if admin:
        print("Admin already exists.")
        db.close()
        return

    admin = User(
        name="Super Admin",
        email="admin@hospitaliq.ai",
        password_hash=hash_password("admin123"),
        role="Super Admin",
        is_active=True,
    )

    db.add(admin)
    db.commit()

    print("Super Admin created successfully!")

    db.close()


if __name__ == "__main__":
    seed_admin()
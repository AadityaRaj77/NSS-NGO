# NGO Registration and Donation Platform

An NGO registration and donation platform with **user donations**, **admin management**, **donation records**, and **auto-expiry of causes**.  
Built for demonstration using **sandbox payment flow** (no real money).

## Features

#### User Side

- User authentication (login/register)
- View **all causes** (active + expired)
- Clear **ACTIVE / EXPIRED** badge on causes
- Donate to active causes (sandbox payment simulation)
- View personal donation history

#### Admin Side

- Create, update, and manage causes
- Causes automatically **expire after deadline**
- View **donors list per cause**
- Donation analytics(per cause):
  - Total donations count
  - Total amount collected
  - Amount distribution(planned but not implemented now)
- Filters on donations:
  - Date range
  - Amount (asc/desc)
  - Name (A–Z)
  - Donation status (SUCCESS / FAILED / PENDING)
- Export donations as **CSV**

#### Payment (Sandbox)

- No real payment gateway keys required
- Mocked payment flow:
  - Create donation → PENDING
  - Verify donation → SUCCESS / FAILED
- Designed to be replaceable with Razorpay live keys later

## Tech Stack

#### Frontend

- React + TypeScript
- Tailwind CSS
- Axios
- React Router

#### Backend

- FastAPI
- SQLAlchemy (Async)
- PostgreSQL
- Alembic (migrations)
- APScheduler (auto-expiry jobs)

## Project Structure

```bash
nss-ngo/
├── backend/
│ ├── app/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── schemas/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── core/
│ │ │ ├── deps.py
│ │ │ └── scheduler.py
│ │ └── main.py
│ ├── alembic/
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── utils/
│ │ │ └── token.ts
│ │ ├── App.tsx
│ │ └── main.tsx
│ └── package.json
│
└── README.md

```

## Setup Instructions

#### Clone Repository

```bash
git clone https://github.com/<your-username>/NSS-NGO.git
cd nss-ngo
```

### Backend Setup

#### Create virtual environment

```bash
cd backend
python -m venv venv
source venv/Scripts/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Database

```bash
CREATE DATABASE ngo_db;
```

#### Update `.env`

```bash
DATABASE_URL=postgresql+asyncpg://ngo_user:strongpassword@localhost:5432/ngo_db
JWT_SECRET=supersecretkey
JWT_ALGORITHM=HS256
ADMIN_REGISTRATION_KEY=ngo-secret-2026
```

#### Run migrations

```bash
alembic upgrade head
```

Start backend

```bash
uvicorn app.main:app --reload
```

### Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Start frontend

```bash
npm run dev
```

## Auto-Expire Logic

- APScheduler runs every minute
- Automatically:
  - Finds causes where deadline < now
  - Marks them is_active = false
- Expired causes:
  - Still visible to users
  - Donation disabled
  - Marked EXPIRED

## Demo Payment Flow

- User clicks Donate
- Donation created with PENDING
- Sandbox verification
- Status updated to SUCCESS
- Cause collection amount updated
- No real gateway, test cases only.

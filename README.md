# PawCare

PawCare is a MERN stack dog health and wellness tracker built from the project paper. It covers the five core features described in the document:

- Vaccination tracking
- Growth and diet monitoring
- Disease prediction
- Grooming and hygiene reminders
- Breed-specific recommendations

## Project Structure

- `backend/` - Express + MongoDB API
- `frontend/` - React dashboard and user flow
- `backend/data/breeds.json` - breed reference data
- `frontend/src/data/pawcareData.js` - shared UI data and symptom rules

## Local Setup

### 1. Install dependencies

From the repository root:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2. Configure environment variables

Create `backend/.env` and set:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pawcare
```

If you use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 3. Run the backend

```bash
npm run start:backend
```

### 4. Run the frontend

In a second terminal:

```bash
npm run start:frontend
```

## Validation

- Frontend tests pass with `npm --prefix frontend test -- --watch=false`
- Backend loads successfully and exposes the API server
- MongoDB is required for full persistence; without it, the backend starts but logs a connection error

## GitHub Transfer

To move this project to GitHub:

1. Create a new empty repository on GitHub.
2. Open a terminal in `c:\Users\madhu\Downloads\pawcare-project`.
3. Run:

```bash
git init
git add .
git commit -m "Build PawCare from paper specification"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If you already have a Git repository, skip `git init` and just add the remote if needed.

## Notes

- The app currently uses local browser storage for some dashboard state and MongoDB for backend persistence.
- The paper-aligned breed set is available for Labrador Retriever, German Shepherd, Pomeranian, Rajapalayam, and Chippiparai.

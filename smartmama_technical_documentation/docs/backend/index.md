# Backend Overview

The SmartMama backend is built with **FastAPI** and **SQLAlchemy/PostgreSQL**.

The backend is responsible for:

- HTTP API endpoints;
- request validation using Pydantic schemas;
- authentication;
- authorisation;
- business rules;
- database access;
- integrations;
- risk-assessment orchestration;
- audit logging;
- structured error responses.

The API is the security boundary. Frontend restrictions are not sufficient because a user can bypass UI controls by directly calling the API.

## Getting started

- Python 3.12.x
- `uv`
- PostgreSQL
- Git
- Access to required development environment variables

The project was standardised on Python **3.12** for deployment compatibility. The repository contains `.python-version`.

## Repository Setup

Clone the repository and enter it:

```bash
git clone <repository-url>
cd Cybernetics_Backend
```

The backend repository currently uses a FastAPI application with `smartmama/main.py` as the application module.

The repository also contains the documentation site under `docs/` and `mkdocs.yml`.



## Optional tooling

- Postman for API testing
- GitHub account with repository access
- Heroku access for deployment work

Do not place production secrets in source control.

## Backend Setup

Create the Python 3.12 environment with `uv`:

```bash
uv python install 3.12
uv venv env --python 3.12
source env/bin/activate
```

## Environment Variables

SmartMama uses environment variables for configuration and secrets.

The backend configuration uses `pydantic-settings` and loads `.env` during local development.

Example local configuration:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/smartmama_db
ALGORITHM=RS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Additional variables are required as integrations are enabled, including IDAnalyzer, SMS Leopard, LocationIQ and AttachmentScanner.

**Never copy real credentials into documentation, Git, screenshots or Postman collections.**

For production, configure secrets in the deployment environment rather than committing `.env`.

## Project Structure

The backend currently follows a package-oriented structure similar to:

```text
smartmama/
├── main.py
├── database.py
├── models/
├── schemas/
├── routers/
├── services/
├── security/
└── core/
    └── config.py
```

Typical responsibility:

- `routers/`: HTTP routes, dependencies and status-code translation.
- `schemas/`: Pydantic request/response models.
- `services/`: business logic.
- `models/`: SQLAlchemy persistence models.
- `security/`: authentication, tokens, password handling and access control.
- `database.py`: engine/session/Base setup.
- `core/config.py`: environment-backed settings.
- `main.py`: FastAPI application and router registration.

As the platform expands, admin, supervisor, consent, audit and ticket functionality should follow the same separation rather than being placed inside unrelated modules.


## API Reference

This page is the single reference for SmartMama's backend API surface, grouped by resource. For the authentication/authorization *model* (roles, scopes, token lifecycle), see [Security → Authentication](../security/authentication.md) and [Security → Authorization](../security/authorization.md). This page covers routes and resource-specific behaviour only.

## Authentication

Authentication endpoints establish a user's authenticated session/token.

Current known routes from the implemented CHV router:

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/chv/signup` | Register a CHV |
| POST | `/auth/chv/login` | Authenticate a CHV |
| POST | `/auth/chv/forgot-password` | Start password recovery |
| POST | `/auth/chv/reset-password` | Complete password reset |
| GET | `/auth/chv/current` | Return current CHV |
| PATCH | `/auth/chv/profile` | Update CHV profile |
| DELETE | `/auth/chv/profile` | Delete CHV profile |
| POST | `/auth/chv/logout` | Log out current CHV |

The final documentation must add equivalent supervisor/admin/super-admin routes after their routers are implemented, and should link directly to the generated OpenAPI documentation.

## CHV

The CHV API manages CHV onboarding and profile operations.

The protected operational rule is:

> An authenticated CHV who has not completed required identity/administrative verification must not access maternal operational functions.

CHV verification data may include identity/document uploads. File handling must pass through the upload-security pipeline before the backend accepts the file.

## Mothers

Known implemented routes:

| Method | Path | Purpose |
|---|---|---|
| POST | `/mothers` | Create a mother profile |
| GET | `/mothers` | List mothers visible to the current CHV |
| GET | `/mothers/{mother_id}` | Retrieve an authorised mother |
| PATCH | `/mothers/{mother_id}` | Update an authorised mother |

The service receives the authenticated CHV identity and uses it to enforce ownership/scope. A CHV must not be able to retrieve another CHV's mother merely by changing `mother_id` in the URL.

## Locations

Location endpoints should expose only the minimum location data needed by the product. Exact maternal household coordinates are sensitive and must be protected by role and assignment.

## Risk Assessments

Risk-assessment endpoints orchestrate validated visit data, Random Forest classification and persistence. Responses must explicitly identify the output as a risk classification/decision-support result, not a diagnosis.

## Referrals

Referral endpoints create and retrieve referral records for authorised maternal workflows. Referral data must be scoped to the CHV/mother relationship and protected from cross-user access.

## Consent

Consent is a first-class endpoint/workflow rather than an incidental field. It records that the mother gave or refused permission for the stated processing purpose. Consent should be timestamped, attributable and auditable.

## Supervisors

Supervisor endpoints cover supervisor authentication, onboarding/activation, CHV verification review, CHV assignment visibility and supervisor-scoped oversight. A supervisor must not access CHVs outside their assigned scope.

## Admin

Admin endpoints cover operational administration: onboarding supervisors, assigning CHVs to supervisors, support functions, account management and appropriate activity visibility.

## Super Admin

Super-admin endpoints provide privileged system administration. They require stronger authentication and authorisation than ordinary users and must be audited.

## Tickets & Support

Support/ticket endpoints provide a controlled way to report and manage operational problems. Tickets should avoid unnecessary inclusion of health or identity data.

## Audit Logs

Audit-log access is restricted to authorised administrative roles. Logs should record security-relevant actions without copying sensitive payloads unnecessarily.


## Running the Backend

The FastAPI application lives at:

```text
smartmama/main.py
```

The application object is:

```python
app = FastAPI(...)
```

For local development:

```bash
uvicorn smartmama.main:app --reload
```

The Heroku process uses the same application module and receives its port from `$PORT`:

```text
web: uvicorn smartmama.main:app --host 0.0.0.0 --port $PORT
```

If the project root is intentionally configured differently, update the command to match the actual import path. Do not use `main:app` when the file is `smartmama/main.py`.
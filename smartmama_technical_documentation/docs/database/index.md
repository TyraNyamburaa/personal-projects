# Database Overview

SmartMama uses PostgreSQL and a relational model.

The original ERD defines the maternal domain around CHVs, mothers, pregnancies, visits, risk assessments, referrals and locations. The system has since evolved to include a shared user model and governance/security entities.

The database documentation should therefore be maintained from the live SQLAlchemy models/migrations. The ERD remains useful as a domain reference but is not the final authority when implementation changes.

## Getting started - Database Setup

SmartMama uses **PostgreSQL** as its relational database.

## Install PostgreSQL

Install PostgreSQL for your operating system:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS with Homebrew
brew install postgresql
```

## Create the database

```bash
sudo -u postgres psql
CREATE USER smartmama_user WITH PASSWORD 'your_password';
CREATE DATABASE smartmama_db OWNER smartmama_user;
GRANT ALL PRIVILEGES ON DATABASE smartmama_db TO smartmama_user;
\q
```

## Configure the connection

Set the `DATABASE_URL` environment variable in your `.env` file:

```env
DATABASE_URL=postgresql://smartmama_user:your_password@localhost:5432/smartmama_db
```

For production, use the deployment platform's database URL.

See [Database](../database/database.md) for the full database documentation.


## Database Migrations

Use the migration tool configured by the backend repository.

Before applying migrations:

1. activate the Python environment;
2. confirm `DATABASE_URL`;
3. review the migration;
4. back up production data where appropriate;
5. apply the migration;
6. verify the schema.

If Alembic is used in the repository, the typical commands are:

```bash
alembic upgrade head
alembic revision --autogenerate -m "describe change"
```

**Do not run these commands blindly.** Use the migration configuration and scripts actually present in the repository.


# ERD

The project already has an ERD document covering the original maternal domain.

**Source:** `CYBERNETICS ERD document.pdf`

It defines relationships including:

```text
CHV → Mothers
Mother → Pregnancy
Pregnancy → Visit
Visit → Risk Assessment
Risk Assessment → Referral
Mother → Location
```

The ERD should be updated to reflect the newer shared-user architecture and governance entities:

```text
User
 ├── CHV
 ├── Supervisor
 ├── Admin
 └── Super Admin

User/Role/Assignment
Consent
Audit Log
Tickets
Verification records
```

The live migrations and ORM models must remain the source of truth.


# Data Model

The original model documented these core entities:

- `chv`
- `mothers`
- `pregnancies_tracking`
- `visit_log`
- `risk_assessments`
- `referral`
- `location`

The evolved design adds cross-cutting entities.

## Shared user model

A `user` table should contain attributes common to all authenticated users, such as:

- unique user ID;
- login identifier;
- password hash;
- role;
- active/disabled state;
- verification state where applicable;
- timestamps.

Role-specific tables hold attributes unique to a CHV, supervisor, admin or super-admin.

This prevents duplication of authentication fields and gives the system a single identity anchor for audit logging and authorisation.

## Governance entities

The system should include explicit persistence for:

- consent;
- audit/activity logs;
- supervisor-to-CHV assignments;
- verification submissions/status;
- support tickets where implemented;
- MFA/TOTP configuration metadata where implemented.

Exact columns belong in the live model/data dictionary.


# Tables

## Core maternal tables

| Table | Purpose |
|---|---|
| `user` | Shared authentication/identity attributes |
| `chv` | CHV-specific profile and operational information |
| `supervisor` | Supervisor-specific information |
| `admin` | Admin-specific information |
| `super_admin` | Super-admin-specific information |
| `mothers` | Maternal profile |
| `pregnancies_tracking` | Pregnancy lifecycle |
| `visit_log` | Household-visit observations |
| `risk_assessments` | Model-generated classifications |
| `referral` | Referral workflow |
| `location` | Location associated with maternal records |
| `consent` | Consent records |
| `audit_log` | Security/operational activity |
| `tickets` | Support/issue workflow |
| `chv_assignments` | Supervisor-to-CHV scope, if implemented as a separate entity |
| `verification` | Identity/document verification state, if implemented separately |


# Data Dictionary

The original ERD documents the following core fields.

### CHV

| Field | Type | Constraint |
|---|---|---|
| `chv_id` | string | PK |
| `national_id` | string | required |
| `first_name` | string | required |
| `last_name` | string | required |
| `phone_number` | string | unique/required |
| `hashed_password` | string | required in original model; evolved design moves auth to `user` |
| `is_active` | boolean | required |
| `created_at` | datetime | required |

### Mother

| Field | Type | Constraint |
|---|---|---|
| `mother_id` | string/UUID | PK |
| `chv_id` | FK | required |
| `location_id` | FK | required where location is collected |
| `national_id` | string | unique/required according to implementation |
| `first_name` | string | required |
| `last_name` | string | required |
| `phone_number` | string | required |
| `date_of_birth` | date | required |
| `expected_delivery_date` | date | required |
| `consent_given` | boolean | required in original model; superseded by dedicated consent records |
| `created_at` | datetime | required |

### Pregnancy

| Field | Type | Purpose |
|---|---|---|
| `pregnancy_id` | identifier | Primary key |
| `mother_id` | FK | Mother |
| `expected_delivery_date` | datetime/date | Expected delivery |
| `last_menstrual_period` | date | LMP |
| `gestational_age_at_registration` | integer | Weeks |
| `pregnancy_status` | enum/string | Active/delivered/miscarriage in original ERD |
| `antenatal_visit_count` | integer | ANC count |
| `rhesus_factor` | string | Rh factor |
| `created_at` | datetime | Created |
| `updated_at` | datetime | Updated |

### Visit

| Field | Purpose |
|---|---|
| `visit_id` | Visit identifier |
| `mother_id` | Mother |
| `pregnancy_id` | Active pregnancy |
| `visit_date` | Visit date |
| `gestational_age` | Gestational age |
| `blood_pressure` | Recorded BP |
| `temperature` | Body temperature |
| `symptoms_logged` | Symptoms/observations |

### Risk assessment

| Field | Purpose |
|---|---|
| `risk_id` | Assessment identifier |
| `visit_id` | Source visit |
| `mother_id` | Mother |
| `pregnancy_id` | Pregnancy |
| `risk_level` | Low/medium/high classification |
| `confidence_score` | Model confidence where exposed |
| `link_url` | Secure summary link where used |
| `created_at` | Classification timestamp |

### Referral

| Field | Purpose |
|---|---|
| `referral_id` | Referral identifier |
| `risk_id` | Triggering assessment |
| `mother_id` | Mother |
| `referral_date` | Referral time |
| `link_url` | Secure summary |

### Location

| Field | Purpose |
|---|---|
| `location_id` | Location identifier |
| `mother_id` | Mother |
| `latitude` | Latitude |
| `longitude` | Longitude |

The new `user`, consent, audit, verification, assignment and administrative tables must be generated from the actual implementation before final production sign-off.


# Relationships

Core relationship chain:

```text
User
 ├─1:1→ CHV / Supervisor / Admin / Super Admin
 │
CHV
 └─1:M→ Mother
       └─1:M→ Pregnancy
              └─1:M→ Visit
                     └─1:1/M→ Risk Assessment
                            └─1:M→ Referral

Mother
 └─1:M→ Location (depending on location model)
Mother
 └─1:M→ Consent
User
 └─1:M→ Audit Log
Supervisor
 └─M:M→ CHV through assignment/scope
```

Actual cardinalities must match the ORM/migration implementation.



# Constraints

Security and data-integrity constraints are not only database constraints.

## Database constraints

Use primary keys, foreign keys, unique constraints, non-null constraints and appropriate indexes.

## Business constraints

### CHV scope

A CHV may access only maternal records within their authorised assignment/ownership scope.

### Supervisor scope

A supervisor may review only CHVs assigned to that supervisor.

### Admin assignment

Admins are responsible for assigning CHVs to supervisors. The assignment must be enforced by backend queries, not only dashboard filtering.

### Verification gate

An unverified CHV cannot perform protected operational actions.

### Mother verification gate

Where the product requires mother identity verification before record creation, the registration flow must not continue until verification succeeds.

### Consent gate

The application must not process maternal information for the stated purpose without the required consent.

### Role-controlled UI

The dashboard a user receives is determined by their role, but role-based UI is only a presentation layer. The API independently enforces permissions.

### Least privilege

Administrators and supervisors should not automatically receive unrestricted maternal-health visibility simply because they have higher privileges.


# Migrations

Every schema change should be represented by a migration.

Migration discipline:

1. make model change;
2. generate/write migration;
3. inspect SQL;
4. test against a disposable database;
5. run application tests;
6. review data migration implications;
7. deploy migration before/with application release as required.

Never delete or rewrite production history to hide an incorrect migration. Create a corrective migration.

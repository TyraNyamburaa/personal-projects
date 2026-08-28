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


## ERD

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

## Relationships

![Database Relationships](../assets/images/relationships.png)



## Constraints

Security and data-integrity constraints are not only database constraints.

### Database constraints

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


## Migrations

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

# Deployment Overview

The backend is designed for deployment to Heroku through GitHub Actions.

The deployment process must:

1. build/install dependencies;
2. use the repository's Python version;
3. configure production secrets;
4. deploy the application;
5. run/verify database migrations as required;
6. verify the production application;
7. monitor logs;
8. provide a rollback path.

# Environment Configuration

Production configuration is supplied through platform secrets/config vars.

Never commit:

- `SECRET_KEY`;
- provider API keys;
- database passwords;
- TOTP secrets;
- production tokens.

Use separate values for development, staging and production.


# Heroku

The project uses:

```text
.python-version
Procfile
```

The Python version file should contain the supported major/minor version used by the deployment environment, currently Python 3.12.

Example:

```text
3.12
```

The Procfile must point to the actual FastAPI module:

```text
web: uvicorn smartmama.main:app --host 0.0.0.0 --port $PORT
```

Heroku provides `$PORT`; the application must listen on it.


# GitHub Actions

The deployment workflow should:

- checkout code;
- use `.python-version`;
- install dependencies;
- build/validate;
- deploy to Heroku using repository secrets.

Required deployment secrets include:

```text
HEROKU_API_KEY
HEROKU_APP_NAME
HEROKU_EMAIL
```

The workflow file is:

```text
.github/workflows/deploy.yml
```

If the repository uses a different filename, update this documentation to match.


# Database Deployment

Production must use the deployment database URL rather than localhost.

The application should normalise Heroku's legacy `postgres://` scheme to SQLAlchemy's supported PostgreSQL URL form where necessary.

Never hard-code production database credentials.


# Secrets

Secrets are stored in:

- local `.env` for development;
- GitHub repository secrets for CI/CD;
- Heroku config vars for runtime production configuration.

`.env` must be in `.gitignore`.

If a secret is exposed:

1. revoke/rotate it;
2. determine exposure scope;
3. inspect access logs;
4. update deployment configuration;
5. document the incident according to policy.


# Production Verification

After deployment:

1. confirm the dyno/process is running;
2. confirm the API responds;
3. confirm database connectivity;
4. confirm authentication;
5. confirm a protected endpoint rejects unauthorised access;
6. confirm integration health;
7. inspect application logs for startup errors;
8. run a minimal smoke test.

Do not use real maternal/identity data for smoke testing.


# Rollback

A rollback should restore the last known-good application version.

Database migrations require special care: rolling back application code without handling schema compatibility can create a second outage.

For destructive schema changes, use an expand/contract approach where practical:

1. add compatible schema;
2. deploy compatible code;
3. migrate data;
4. remove old schema only after the new release is stable.

# Testing Strategy

SmartMama testing covers:

- unit behaviour;
- service/business logic;
- API integration;
- database constraints;
- mobile workflows;
- web dashboard permissions;
- identity verification;
- file security;
- role/assignment boundaries;
- MFA;
- risk-classification behaviour;
- referral flows;
- third-party failure scenarios.

Testing should include both happy paths and adversarial/edge cases.


## Test Types

### Unit tests

Unit tests should cover deterministic business logic without requiring real third-party services. Examples: password verification, role checks, assignment checks, consent validation, risk-class mapping, referral eligibility, file validation, error translation.

### Integration tests

Integration tests should verify interactions between: FastAPI and PostgreSQL; authentication and protected routes; service and repository layers; mocked identity verification; mocked SMS delivery; mocked location service; mocked malware scanner; risk classifier and persistence.

### API tests

API testing should verify: correct status codes, response schema, validation, authentication, authorisation, role restrictions, assignment restrictions, verification gates, consent gates, duplicate/conflict handling, and third-party failure handling. Every protected endpoint should have at least one negative authorisation test.

### Mobile tests

Test: authentication, verification state, maternal registration, consent, file selection/upload, household visit, risk result comprehension, referral, SMS-related confirmation, interruption/recovery, network failure, and offline behaviour where supported. Test on Android devices/emulators representative of the target environment.

### Security tests

Security QA should include: broken-access-control tests; IDOR tests on mother IDs; role escalation attempts; supervisor-scope bypass attempts; unverified-CHV access attempts; MFA bypass attempts; token replay/expiry tests; password reset abuse; upload malware tests; file-type spoofing; oversized files; sensitive data leakage in errors/logs; rate-limit checks; third-party failure/fail-open checks.

A successful UI restriction is not evidence of backend authorisation.


## Postman Testing

Maintain a Postman collection grouped by endpoint/domain.

At minimum, test:

### Authentication

- signup;
- login;
- current user;
- logout;
- forgot password;
- reset password;
- MFA where enabled.

### CHV

- registration;
- identity verification;
- profile;
- protected operational actions;
- unverified-account denial.

### Mothers

- create;
- list;
- get;
- update;
- cross-CHV access denial;
- consent refusal;
- identity verification failure.

### Supervisor

- login;
- verification queue;
- open CHV record;
- verify;
- needs correction;
- reject;
- escalate;
- assignment-scope denial.

### Admin / Super Admin

- supervisor onboarding;
- CHV assignment;
- activity logs;
- tickets;
- privileged actions;
- role-boundary denial.

### Risk / Referral

- household visit;
- risk classification;
- high/medium/low outcomes;
- referral;
- duplicate referral;
- SMS provider failure.

Each request should include positive, negative, boundary and security assertions.


## Test Data

Use synthetic/test data only.

Test fixtures should include:

- verified CHV;
- unverified CHV;
- pending/needs-correction/rejected/escalated/verified CHV cases;
- verified mother;
- failed mother identity verification;
- consent granted;
- consent refused;
- CHVs assigned to different supervisors;
- different admin roles;
- valid and invalid maternal visits;
- low/medium/high model outputs;
- safe and malicious upload samples.

Never place real national IDs, real patient records or real biometric data in Postman collections, screenshots or test fixtures.


## Troubleshooting & Known Issues

### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Field required` for `DATABASE_URL`, `SECRET_KEY`, `ALGORITHM` | Environment variables not loaded | Check `.env`, working directory and Pydantic settings |
| `No interpreter found for Python 3.12` | Python 3.12 not installed/visible to uv | `uv python install 3.12` |
| App imports fail after environment recreation | Dependencies not installed | `uv pip install -r requirements.txt` |
| API works locally but Heroku fails | Wrong module path/port/config | Check `Procfile`, `DATABASE_URL`, secrets and application import path |
| Protected endpoint returns 401 | Missing/expired token | Authenticate again and send bearer token |
| Protected endpoint returns 403 | Role/verification/scope failure | Check user role, verification and assignment |
| Upload rejected | Type/size/scanner failure | Check MIME/type/size and scanner result |
| Identity verification stuck | Provider unavailable or invalid request | Inspect provider-safe integration logs; do not fail open |
| Mother record visible to wrong user | Authorisation defect | Treat as security incident; test ownership query immediately |

### Known issues

This section is intentionally conservative. Only verified issues should be listed here.

At the time of documentation authoring, implementation is evolving around:

- shared `user` identity architecture;
- supervisor/admin/super-admin endpoints;
- consent endpoint;
- audit-log implementation;
- IDAnalyzer integration;
- AttachmentScanner integration;
- TOTP MFA;
- role/assignment enforcement.

Replace this section with confirmed issue IDs and statuses before final submission.

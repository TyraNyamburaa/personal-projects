# Code Style

## Naming conventions

**Python**

- files/modules: `snake_case.py`
- functions: `snake_case`
- variables: `snake_case`
- classes: `PascalCase`
- constants: `UPPER_SNAKE_CASE`
- Pydantic schemas: descriptive `PascalCase`, e.g. `CHVSignup`

**Dart/Flutter**

- files: `snake_case.dart`
- classes/widgets: `PascalCase`
- variables/functions: `camelCase`
- constants: project-consistent `camelCase`/`lowerCamelCase` where used

**API**

Use resource-oriented nouns and consistent HTTP methods.

## Folder structure

New code belongs in the layer responsible for it. Do not place:

- business logic in routers;
- database queries in UI code;
- provider HTTP calls directly inside route handlers;
- secrets in source;
- shared authentication fields repeatedly inside every role table.

Use the existing package structure and add a new module only when the responsibility is genuinely distinct.

## Python standards

The backend uses Python 3.12. Follow the existing project's FastAPI, Pydantic and SQLAlchemy patterns.

Keep route functions thin:

```text
router → schema/dependency → service → database/integration
```

Business logic should be testable independently from HTTP.

## Dart / Flutter standards

Follow the existing Flutter project's architecture and linter configuration. Keep widgets focused on presentation and interaction — network calls and domain rules belong in services/state layers. Reusable components belong in shared UI modules when they are genuinely reused.

## Formatting

Python:

```bash
ruff format .
```

Dart:

```bash
dart format .
```

Use the commands/configuration actually present in CI. Formatting should be automated where possible.

## Linting

The backend should use the lint/format configuration committed to the repository. Flutter should use `analysis_options.yaml` and the project's configured Dart/Flutter lints. A CI failure should be fixed in code rather than bypassed with blanket ignores.

## Comments & docstrings

Comments explain **why**, not what obvious code already says. Use docstrings for public services, complex security decisions and integration boundaries. Avoid comments that become incorrect when code changes — security assumptions should be explicit and tested.


# Error Handling

Translate low-level exceptions into domain/API errors at the appropriate boundary. Do not return raw database exceptions or provider stack traces to clients.

Expected business failures should be represented using predictable HTTP status codes and actionable messages.

## HTTP status codes

Use HTTP status codes consistently:

| Status | Meaning |
|---|---|
| 400 | Invalid request/business input |
| 401 | Missing/invalid authentication |
| 403 | Authenticated but not authorised |
| 404 | Resource not found or intentionally not disclosed |
| 409 | State/conflict problem |
| 422 | Schema validation failure |
| 429 | Rate limited |
| 500 | Unexpected server error |
| 502/503 | External service/dependency unavailable |

Error messages should be actionable without leaking secrets, database details, stack traces or sensitive personal information. External provider errors should be translated into stable SmartMama-facing errors.


# Logging

Logs support debugging, security monitoring and incident response. Use structured logs where supported.

## What to log

- service lifecycle events;
- integration failures;
- unexpected exceptions;
- security-relevant events.

Audit logs should record the actor, action, target/resource, timestamp, outcome and relevant metadata without unnecessarily duplicating sensitive data.

## What never to log

- passwords;
- JWTs/access tokens;
- national ID values in plaintext;
- raw identity documents;
- raw selfies/biometric material;
- full maternal-health payloads unless explicitly required and protected.


# Git Workflow

## Branching

Use short-lived branches from the team's protected main branch.

Examples:

```text
feature/mother-registration
feature/supervisor-dashboard
fix/authorization-scope
security/mfa
docs/api-reference
```

Merge through pull requests after review and checks.

## Commit messages

Use a consistent, searchable format.

Recommended:

```text
feat: add supervisor verification workflow
fix: enforce CHV mother ownership
security: scan uploaded identity documents
docs: update deployment guide
test: add cross-role authorization cases
refactor: extract IDAnalyzer service
```

Keep commits focused and describe the actual change.

## Pull requests

Every PR should state:

- what changed;
- why;
- affected areas;
- tests run;
- security/privacy impact;
- migration impact;
- screenshots for UI changes where useful.

Security-sensitive changes require review before merge. Do not merge code that changes permissions, data access or identity verification without corresponding tests.

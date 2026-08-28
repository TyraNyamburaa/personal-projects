# Security Overview

SmartMama processes health, identity and location information. Security is therefore part of the product architecture rather than a separate feature.

The security model is based on:

- least privilege;
- role-based and record-level authorisation;
- verified identities;
- strong password storage;
- JWT/bearer authentication;
- TOTP MFA;
- secure file handling;
- explicit consent;
- auditability;
- data minimisation;
- controlled third-party processing;
- secure transport;
- incident response.

## Authentication

This is the single canonical page for how SmartMama authenticates users, across backend, mobile and web. Other sections link here rather than re-describing authentication.

## Model

SmartMama distinguishes several checks that must never be collapsed into one boolean:

- **identity** — who is the user?
- **authentication** — has the user proven control of their credentials?
- **verification** — has required identity/document verification been completed?
- **authorisation** — is the authenticated and verified user allowed to perform this action? (see [Authorization](authorization.md))
- **assignment** — does the requested record fall within that user's operational scope?

## Flow

```text
Login
  ↓
Credential validation
  ↓
Password verification
  ↓
MFA challenge where enabled
  ↓
Token/session issued
  ↓
Protected request
  ↓
Authentication + role + verification + assignment checks
  ↓
Allow / reject
```

Admins are required to use TOTP MFA. MFA is optional for CHVs and supervisors to reduce onboarding friction, subject to the project's final security policy. See [MFA / TOTP](mfa.md) for details.

Unverified CHVs must not perform operational CHV actions. The same principle applies to any role whose identity verification is a prerequisite for access.

## Passwords and tokens

Passwords are stored as hashes, never plaintext — see [Password Security](passwords.md).

The current backend uses bearer authentication and JWT configuration (`SECRET_KEY`, `ALGORITHM`, token expiry). Token implementation details must be kept aligned with the live security module. See [JWT](../security/index.md#authentication) for the token format itself.

## Security requirements

Authentication must:

- validate credentials server-side;
- use secure password hashing;
- expire sessions/tokens according to policy;
- revoke/logout sessions where supported;
- protect MFA secrets;
- prevent token leakage;
- rate-limit sensitive authentication operations where appropriate.

## Endpoints

See [Backend → API Reference](../backend/index.md#authentication) for the current authentication routes.

## Mobile client behaviour

The mobile app stores only the minimum token/session information needed to authenticate API calls. The app should:

- securely handle tokens;
- clear session state on logout;
- handle expiry;
- never expose tokens in logs;
- show verification/access restrictions clearly.

MFA uses TOTP where enabled. The server remains authoritative for the MFA challenge.


## Authorization

This is the single canonical page for SmartMama's authorization model. Backend and web sections link here rather than re-describing role permissions.

## Model

The authorisation model combines role + verification + assignment. Role-based access control is combined with record-level scope.

**Important:** hiding a menu item is not authorisation. Every protected endpoint must enforce the rule server-side. Never trust a client-provided `role`, `chv_id` or `supervisor_id`.

## Roles

### CHV
A CHV can work with mothers assigned/registered within their authorised scope.

### Supervisor
A supervisor can review CHVs assigned to that supervisor. They must not see unrelated CHVs merely because they exist in the system.

### Admin
An admin manages system operations and assignments. Administrative visibility should be minimised where maternal health data is not required.

### Super Admin
Super admins have elevated system privileges and should have stronger controls and audit coverage.

## Request-level checks

```text
CHV request
  → Is authenticated?
  → Is CHV verified/active?
  → Does mother belong to CHV's scope?
  → Allow/reject

Supervisor request
  → Is authenticated?
  → Is supervisor active/verified?
  → Is CHV assigned to supervisor?
  → Allow/reject

Admin request
  → Is authenticated?
  → Is admin authorised for action?
  → Allow/reject
```


## Validation

This is the single canonical page for input validation across SmartMama. The backend must never trust client-side validation — every layer below is enforced independently.

## Validation boundaries

Validation occurs at multiple boundaries:

1. client-side validation for immediate UX feedback (mobile/web);
2. Pydantic request validation (backend);
3. service/business-rule validation;
4. database constraints;
5. third-party integration validation;
6. file-security validation.

Examples include:

- required fields;
- date and range checks;
- valid phone numbers;
- permitted enum values;
- ownership/scope;
- verification state;
- consent state;
- upload size/type;
- malware scan result.

## Mobile client validation

The mobile client should validate obvious input errors before submission:

- required fields;
- ranges;
- date relationships;
- file size/type;
- phone format.

Server validation remains authoritative. For sensitive workflows, the app should provide clear messages such as "Identity verification failed" or "This file could not be accepted" rather than exposing raw provider or scanner errors.


## JWT

The current configuration uses a secret key, algorithm and access-token expiry.

Required environment variables include:

```env
SECRET_KEY=...
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Secrets must be unique per environment and rotated according to the security policy.

Do not store sensitive maternal information inside JWT claims. Tokens should contain only the minimum identity/authorisation claims needed.


## Password Security

Passwords must be hashed using a modern password-hashing implementation.

Rules:

- never store plaintext;
- never log passwords;
- never return password hashes in API responses;
- never send passwords by email/SMS;
- rate-limit repeated authentication failures where implemented;
- require secure reset tokens for password recovery.

The database field name and hashing algorithm must match the actual security implementation.


## MFA / TOTP

SmartMama uses a library-based **TOTP implementation compatible with RFC 6238** rather than a third-party MFA provider.

## Policy

- Admin MFA: **mandatory**
- Supervisor MFA: **optional**
- CHV MFA: **optional**

The optional setting is intended to avoid unnecessary friction for field workers while retaining stronger protection for users with higher administrative privilege.

TOTP secrets must be stored securely and never logged.

Recovery flows must be protected to prevent MFA bypass.


## Identity Verification

IDAnalyzer is used for identity/document verification.

### CHV

The CHV submits the required identity information/document and completes the identity workflow. Administrative verification of CHV documentation is performed by a supervisor.

### Mother

The mother submits identity information/document and completes the identity workflow.

SmartMama records the **identity verification outcome**, not a claim that a selfie proves pregnancy or motherhood.

### Storage principle

Where the provider can perform verification without SmartMama retaining raw biometric material, SmartMama should retain only the minimum verification result/reference required for the business process and auditability.

Retention must follow the approved privacy/data-retention policy and the provider's contractual terms.


## File Upload Security

Uploads are untrusted input.

The security pipeline should be:

```text
Select file
  ↓
Frontend type/size validation
  ↓
Upload request
  ↓
Backend type/size validation
  ↓
AttachmentScanner
  ↓
Clean?
 ├── No → reject/quarantine
 └── Yes
      ↓
Store/process according to policy
```

The frontend should validate before upload to improve UX, but it is not a security boundary.

Validate:

- allowed MIME type;
- extension;
- maximum size;
- file signature/magic bytes where supported;
- filename safety;
- scanner result.

Apply this to:

- CHV documentation;
- national ID uploads;
- optional CHV profile photo.

The scanner result must be persisted/audited sufficiently to support security investigation without unnecessarily retaining the file.


## Data Protection

SmartMama's design must follow applicable Kenyan data-protection requirements and the organisation's approved privacy policy.

Key engineering principles:

- purpose limitation;
- data minimisation;
- accuracy;
- storage limitation;
- confidentiality/integrity;
- controlled access;
- accountability;
- secure third-party processing.

The system should document why each sensitive field is collected, who can access it, how long it is retained and how it is deleted.


## Privacy

Privacy is both a technical and UX requirement.

The interface should help users understand:

- what information is being collected;
- why it is collected;
- who may access it;
- whether another CHV can see it;
- why location is needed;
- what happens if a mother refuses ID;
- what happens to identity verification information.

During testing, use synthetic data only.

Production privacy controls must still be tested with scenarios involving refusal, incorrect access and role boundaries.


## Audit Logging

Audit logs should capture security and governance events such as:

- login/logout;
- failed authentication;
- MFA events;
- identity-verification results;
- supervisor verification decisions;
- CHV assignment changes;
- mother-record access where required by policy;
- referral creation;
- administrative changes;
- support actions;
- permission changes.

Each event should identify the actor, timestamp, action, target/resource and outcome.

Do not store entire sensitive request bodies in the audit log.


## Third-Party Data Handling

Every integration is a data boundary.

For each provider document:

- data sent;
- purpose;
- legal/policy basis;
- credentials;
- endpoint configuration;
- response handling;
- retention/deletion expectations;
- failure behaviour;
- incident/contact process.

Providers currently in scope:

- IDAnalyzer;
- SMS Leopard;
- LocationIQ;
- AttachmentScanner.

No provider should receive more data than it needs for the requested function.

# Web / Dashboards

The web layer provides role-specific dashboards for operational governance.

The three major administrative views are:

- Supervisor dashboard
- Admin dashboard
- Super-admin dashboard

A dashboard is selected based on the authenticated user's role. The backend independently enforces the same boundary.

## Supervisor Dashboard

The supervisor dashboard is focused on CHV oversight.

### Core sections

#### Overview

- pending verification count;
- verification actions requiring attention;
- assigned CHV summary;
- recent activity within scope.

#### CHV verification

A supervisor should be able to:

1. see pending CHVs assigned to them;
2. open a verification record;
3. review submitted identity/document information;
4. determine whether the evidence is sufficient;
5. approve verification;
6. request correction where appropriate;
7. reject where requirements are not met;
8. escalate ambiguous cases.

#### CHV list

Only CHVs assigned to the supervisor should appear.

#### Activity

Show operational events relevant to the supervisor's scope without unnecessarily exposing maternal health information.

### Verification states

Use:

- Pending
- Needs correction
- Rejected
- Verified
- Escalated

Do not use "Failed" as the supervisor's generic decision state when the case may simply need correction.


## Admin Dashboard

The admin dashboard is for system-level operational management.

### Suggested sections

#### Overview

- users by role/status;
- pending supervisor onboarding;
- system health indicators;
- unresolved support tickets;
- recent security/administrative activity.

#### Supervisor management

- create/onboard supervisor;
- activate/deactivate;
- assign CHVs;
- review assignment state.

#### User management

- search users;
- view account status;
- disable/re-enable accounts where authorised;
- support password/MFA recovery workflows.

#### Activity logs

Admins can review appropriate system activity for support and security.

Administrative visibility should not become unrestricted access to maternal clinical records.


### Super Admin

The super-admin dashboard is reserved for high-privilege operations.

Possible areas include:

- system configuration;
- privileged user administration;
- security controls;
- role/permission management;
- audit review;
- integration configuration status;
- emergency account controls.

Super-admin actions must be strongly authenticated, audited and subject to the smallest practical number of users.


## Routing

Web routing should be role-aware.

Example logical routing:

```text
/login
  ├── /supervisor/*
  ├── /admin/*
  └── /super-admin/*
```

The frontend should redirect users away from routes they cannot use, but the backend must enforce the same permissions.


## State Management

The web client should keep authentication, user role, verification status and relevant dashboard data in managed application state.

Sensitive records should not be unnecessarily duplicated across global state.

Use server responses as the source of truth for permission and verification state.


## Components

Reusable components should be used for:

- status badges;
- verification state;
- confirmation dialogs;
- data tables;
- pagination;
- form controls;
- error/empty/loading states;
- audit/activity entries.

Components should not embed role-specific security logic that the backend does not enforce.


## API Integration

The dashboard communicates with FastAPI over authenticated HTTP.

Every action that changes verification, assignment, account status or privileged configuration should:

1. require an authenticated user;
2. verify role;
3. verify scope;
4. validate the request;
5. perform the change;
6. create an audit record;
7. return a clear result.

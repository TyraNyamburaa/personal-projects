# Mobile Overview

The mobile application is the operational interface for CHVs.

Its design is intentionally centred on the real workflow of household work rather than requiring mothers to operate the system themselves.

Core mobile journeys:

```text
Login
  ↓
Verification/access state
  ↓
CHV dashboard
  ├── Mothers
  ├── Schedule
  ├── Household visit
  ├── Risk assessment
  └── Referrals
```

The mobile app must remain responsive and understandable under field conditions.

## Getting started

- Flutter SDK compatible with the project's `pubspec.yaml`
- Dart SDK supplied by Flutter
- Android Studio or Android SDK
- Android emulator or physical Android device


# Flutter Architecture

The Flutter application should separate:

- presentation/widgets;
- navigation;
- state management;
- API/data services;
- models;
- validation;
- local persistence/cache;
- integration adapters.

Use the architecture that is actually present in the Flutter repository. Do not document a state-management framework that the code does not use.

Security-sensitive rules remain server-side even if the mobile application also implements them for UX.


# Project Structure

A recommended logical structure is:

```text
lib/
├── core/
│   ├── config/
│   ├── networking/
│   ├── storage/
│   └── validation/
├── features/
│   ├── auth/
│   ├── chv/
│   ├── mothers/
│   ├── visits/
│   ├── risk/
│   └── referrals/
├── shared/
│   ├── widgets/
│   └── models/
└── main.dart
```

Follow the actual repository structure if it differs. New code should be placed with the feature it belongs to rather than creating an unrelated global folder.


# Navigation

Navigation should reflect user role and account state.

A CHV who is not verified should be directed to the verification/onboarding state and prevented from entering protected operational flows.

Navigation decisions are UX concerns; API authorisation is the security control.


# Screen Flows

Primary CHV flow:

```text
Launch
 → Login
 → MFA (if enabled)
 → Verification status
 → Dashboard
 → Mother list
 → Mother profile
 → Household visit
 → Risk assessment
 → Referral (if needed)
```

Registration flow:

```text
Start mother registration
 → Consent
 → Identity information/document
 → Identity verification
 → Verified
 → Maternal profile
 → Pregnancy
 → Complete
```


# CHV Registration

CHV onboarding includes:

1. account details;
2. national identity information/document;
3. identity verification through IDAnalyzer;
4. CHV documentation submission;
5. file security checks;
6. supervisor review;
7. verification state;
8. operational access after successful verification.

The supervisor workflow distinguishes cases needing correction from final rejection.


# Mother Registration

The CHV begins registration only after meeting the access prerequisites.

The workflow collects the minimum information needed for the maternal-health service, obtains consent and performs required identity verification.

The system must not use a selfie to claim that someone is medically a mother or pregnant. The identity workflow verifies identity, not pregnancy status.

The mother should understand what information is being collected and why.


# API Integration

All protected API calls should:

- use HTTPS in deployed environments;
- include the correct bearer authentication;
- handle structured error responses;
- time out gracefully;
- retry only where safe;
- avoid duplicate writes.

Uploads should be sent through the security pipeline and should not be treated as trusted merely because the mobile app validated their extension.

## Authentication and validation on the client

For the full authentication model and flow, see [Security → Authentication](../security/authentication.md). The mobile-specific rules: store only the minimum token/session information needed to authenticate calls, clear session state on logout, handle expiry, never expose tokens in logs, and show verification/access restrictions clearly. MFA uses TOTP where enabled; the server remains authoritative for the challenge.

For validation rules (what the client checks before submission vs. what the server enforces authoritatively), see [Security → Validation](../security/validation.md).


# Offline Behaviour

Field connectivity is a known product consideration.

If offline support is implemented, the system must distinguish:

- locally saved draft;
- queued submission;
- successfully synchronised record;
- failed synchronisation.

Sensitive records must not be stored indefinitely on an unmanaged device.

The final offline design should document encryption, retention, conflict handling and what actions are unavailable offline.

## Running the Mobile App

Start an Android emulator or connect an Android device, then:

```bash
flutter pub get
flutter run
```

For a physical device, ensure it can reach the backend host. A device cannot normally reach a backend bound only to `localhost` on the development computer.

Use test accounts and synthetic maternal data during development and QA.

# Product Design

SmartMama's UX is centred on the CHV workflow because CHVs are the primary operators.

Design priorities:

1. task completion;
2. clarity;
3. appropriate trust in decision support;
4. privacy;
5. field usability;
6. recovery from interruptions/errors;
7. accessibility.

The product should avoid making users infer security states from hidden rules.

## Brand

Use the team's approved SmartMama brand guidelines as the visual source of truth. This technical site should not invent a second visual identity.

When brand assets are committed to the documentation repository, link them from this page and record: logo usage, approved colours, typography, spacing, iconography, and accessibility contrast requirements.

## Accessibility

The interface should:

- not rely on colour alone;
- use readable labels;
- provide clear error messages;
- support adequate touch targets;
- maintain sufficient contrast;
- avoid unexplained technical language;
- clearly distinguish risk classification from diagnosis;
- make verification status explicit.

Risk states should use both colour and words such as "Low risk", "Medium risk" and "High risk".


## Design System & User Flows

### Reusable UI patterns

- buttons;
- forms;
- input validation;
- status indicators;
- cards;
- tables;
- confirmation dialogs;
- banners;
- empty/loading/error states.

Risk colours must never be the only signal. Use text labels and accessible indicators alongside colour.

### User flows

#### CHV

```text
Onboard -> Verify -> Login -> Dashboard -> Register/Access Mother
-> Household Visit -> Risk Classification -> Referral -> Follow-up
```

#### Supervisor

```text
Onboard by Admin -> Authenticate -> Verification Queue
-> Review CHV -> Verify / Needs Correction / Reject / Escalate
-> Assigned CHV oversight
```

#### Admin

```text
Authenticate -> Dashboard -> Onboard Supervisor
-> Assign CHVs -> Review Activity -> Support
```

#### Mother

```text
Consent -> Identity Verification -> CHV Registration
-> Receive relevant SMS/referral information
```

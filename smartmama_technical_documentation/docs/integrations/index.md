# Integrations

SmartMama uses external providers for specialised capabilities.

| Provider | Capability | Sensitive data consideration |
|---|---|---|
| IDAnalyzer | Identity/document verification | Identity documents and verification data |
| SMS Leopard | SMS delivery | Recipient phone number + message content |
| LocationIQ | Location/geocoding | Coordinates/location queries |
| AttachmentScanner | Malware scanning | Uploaded files |

# IDAnalyzer

**Purpose:** identity/document verification for CHVs and mothers.

## Integration boundary

The application sends only the information required by the provider's verification API.

The provider response should be normalised into a SmartMama verification result.

Recommended internal outcomes:

- `verified`
- `failed`

Administrative CHV documentation review uses a separate workflow state model (`pending`, `needs_correction`, `rejected`, `verified`, `escalated`).

## Security

Provider credentials belong in secrets.

Do not log identity documents, raw biometric material or provider credentials.

## Failure handling

If the provider is unavailable, the application should not silently treat the user as verified. The verification should remain incomplete and the user should receive a clear retry/status message.


# SMS Leopard

**Purpose:** SMS delivery.

SmartMama uses SMS Leopard to deliver relevant notifications, including secure referral/summary links.

The SMS service should receive only the minimum required recipient and message information.

Do not place national ID numbers, passwords or unnecessary clinical details into ordinary SMS content.


# LocationIQ

**Purpose:** geolocation/geocoding and nearby-location functionality.

Location is sensitive. SmartMama should collect it only where justified by the product workflow and protect exact household coordinates using role and assignment controls.

API credentials must be stored as secrets.


# AttachmentScanner

**Purpose:** malware scanning of uploaded files.

AttachmentScanner is part of the file-security pipeline for uploads such as:

- CHV documentation;
- national ID documents;
- optional profile photos.

The frontend performs early validation, but the backend must scan independently.

A file must not be treated as trusted until it passes backend validation and scanning.


# Integration Configuration

Store provider credentials in environment variables/secrets.

Example pattern:

```env
IDANALYZER_API_KEY=...
SMS_LEOPARD_API_KEY=...
LOCATIONIQ_API_KEY=...
ATTACHMENT_SCANNER_URL=...
ATTACHMENT_SCANNER_API_KEY=...
```

Use the actual variable names implemented in the repository.

For local development, use `.env` only and ensure it is ignored by Git.

For production, configure secrets in the deployment platform.

## PayPal

SmartMama uses PayPal Payment Links for hosted checkout. See the [PayPal implementation guide](paypal.md) for the branded button, API flow, security requirements and production checklist.

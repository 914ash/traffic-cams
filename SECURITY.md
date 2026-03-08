# Security Policy

## Reporting a Vulnerability

Do not open a public issue for suspected secrets, credential leaks, or sensitive data exposure.

Use GitHub private vulnerability reporting or a private maintainer contact channel before disclosure. Include:

- affected file or path
- reproduction steps
- impact summary
- whether a credential rotation may be required

## Scope

This repository is intended to stay free of:

- live API keys
- local `.env` files
- operator logs and pid files
- private datasets or internal URLs

If any such material is found, treat it as a remediation issue before further publication or release activity.

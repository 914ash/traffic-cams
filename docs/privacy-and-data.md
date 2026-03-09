# Privacy and Data Notes

## Secrets

- live credentials are expected through local environment variables only
- `.env` is ignored
- the repo ships with placeholder values, not active keys

## Data Sources

The current prototype uses public or public-facing traffic-camera feeds. Those feeds can change format, rate limits, or availability without warning.

## Personal Data

This public version does not require end-user accounts and does not collect personal data. If a future version adds operator login, audit trails, or private camera networks, those concerns should be documented separately before publication.

# GitHub Hardening Checklist

- Create the repository as public only after the local scan is clean.
- Enable dependency graph.
- Enable Dependabot alerts.
- Enable secret scanning and push protection if available.
- Review branch protection after the first push.
- Keep `.env.example` placeholders only; never upload live secrets.

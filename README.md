# blacktop-feed

Relay for the r/formula1data Devvit app. Every ten minutes a GitHub Actions
cron copies blacktop-api's rendered Formula 1 threads into `formula1.json`,
and the app reads that file from `raw.githubusercontent.com`.

Why the hop exists: a Devvit app may only fetch hosts Reddit has approved for
it. OC Blacktop's own hostnames were denied; `raw.githubusercontent.com` was
approved. The data here is the same public race data ocblacktop.com serves.

Nothing in this repo is edited by hand. `formula1.json` is overwritten by the
workflow whenever the feed changes and left alone when it has not.

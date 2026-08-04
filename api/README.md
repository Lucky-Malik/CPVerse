# CPVerse API

Django backend for CPVerse. Replaces the frontend's mock data layer
(`src/utils/api.js`) with a real database, so ratings, submissions, contests and
friends are persisted and queried instead of hardcoded.

Status: schema and constraints in place. Endpoints and platform ingestion next.

## Stack

Django 6 · Django REST Framework · SQLite for local dev (Postgres in production —
`DATABASES` only, no model changes)

## Run it

```bash
cd api
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python manage.py migrate
.venv/bin/python manage.py test      # 6 tests
.venv/bin/python manage.py runserver
```

## Environment

| Variable | Default | Notes |
|---|---|---|
| `DJANGO_DEBUG` | `true` | Set `false` in production |
| `DJANGO_SECRET_KEY` | dev-only key when `DEBUG` | **Required** when `DEBUG=false` |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` in debug | Comma-separated |

## Schema

`core/models.py`

| Model | Purpose |
|---|---|
| `User` | Custom user (`AbstractUser`) with `display_name` |
| `PlatformAccount` | One row per user per platform — handle, rating, rank, solved count |
| `RatingPoint` | Rating history for timeline charts |
| `Problem` / `Tag` | Platform-scoped problems with topic tags (M2M) |
| `Submission` | Every submission, deduped per problem at query time |
| `Contest` | Upcoming contests cached from CLIST |
| `SavedContest` | User's saved contests + reminder lead time |
| `Friendship` | Directed follow edges for the leaderboard |

### Integrity is enforced in the database, not in view code

| Constraint | What it prevents |
|---|---|
| `uniq_submission_per_account` `(account, external_id)` | Re-running a platform sync duplicating submissions — ingestion is idempotent |
| `uniq_rating_point` `(account, occurred_at)` | Duplicate rating history on resync |
| `uniq_problem_per_platform` `(platform, external_id)` | Collisions between platforms reusing IDs (CF `1A` vs LeetCode `1A`) |
| `uniq_account_per_platform` `(user, platform)` | Two Codeforces handles on one account |
| `contest_ends_after_start` | Contests that end before they start |
| `no_self_friendship` | Following yourself into the leaderboard |

### Best-verdict-per-problem

`Submission.best_per_problem(account)` collapses repeat attempts to one row per
problem — accepted if the problem was ever solved, otherwise the latest attempt.
It compiles to a single window function evaluated in the database:

```sql
ROW_NUMBER() OVER (
  PARTITION BY problem_id
  ORDER BY CASE WHEN verdict = 'AC' THEN 0 ELSE 1 END, submitted_at DESC
)
```

The frontend previously did this dedupe in JavaScript over the full submission
list on every render.

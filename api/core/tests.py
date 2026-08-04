from datetime import timedelta

from django.db import IntegrityError, transaction
from django.test import TestCase
from django.utils import timezone

from core.models import (
    Contest,
    Friendship,
    Platform,
    PlatformAccount,
    Problem,
    Submission,
    User,
    Verdict,
)


class SchemaTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("lucky", password="x")
        self.account = PlatformAccount.objects.create(
            user=self.user, platform=Platform.CODEFORCES, handle="luckymalik_07"
        )
        self.now = timezone.now()

    def _submit(self, problem, verdict, minutes, external_id):
        return Submission.objects.create(
            account=self.account,
            problem=problem,
            external_id=external_id,
            verdict=verdict,
            submitted_at=self.now + timedelta(minutes=minutes),
        )

    def test_best_per_problem_prefers_ac_then_latest(self):
        solved = Problem.objects.create(
            platform=Platform.CODEFORCES, external_id="1800A", name="Tree Queries"
        )
        unsolved = Problem.objects.create(
            platform=Platform.CODEFORCES, external_id="1800E", name="Graph Cost"
        )
        self._submit(solved, Verdict.WA, 0, "s1")
        ac = self._submit(solved, Verdict.AC, 1, "s2")
        self._submit(solved, Verdict.TLE, 2, "s3")
        self._submit(unsolved, Verdict.WA, 0, "s4")
        latest_fail = self._submit(unsolved, Verdict.TLE, 5, "s5")

        best = {s.problem_id: s for s in Submission.best_per_problem(self.account)}

        self.assertEqual(len(best), 2)
        self.assertEqual(best[solved.id].id, ac.id)
        self.assertEqual(best[unsolved.id].id, latest_fail.id)

    def test_resync_cannot_duplicate_a_submission(self):
        problem = Problem.objects.create(
            platform=Platform.CODEFORCES, external_id="1800A", name="Tree Queries"
        )
        self._submit(problem, Verdict.AC, 0, "s1")
        with self.assertRaises(IntegrityError), transaction.atomic():
            self._submit(problem, Verdict.AC, 0, "s1")

    def test_one_account_per_platform(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            PlatformAccount.objects.create(
                user=self.user, platform=Platform.CODEFORCES, handle="alt_handle"
            )

    def test_same_problem_id_allowed_across_platforms(self):
        Problem.objects.create(
            platform=Platform.CODEFORCES, external_id="1A", name="Theatre Square"
        )
        Problem.objects.create(
            platform=Platform.LEETCODE, external_id="1A", name="Two Sum"
        )
        self.assertEqual(Problem.objects.count(), 2)

    def test_contest_must_end_after_it_starts(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            Contest.objects.create(
                external_id="cf-1",
                platform=Platform.CODEFORCES,
                name="Round 800",
                starts_at=self.now,
                ends_at=self.now - timedelta(hours=1),
            )

    def test_cannot_friend_yourself(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            Friendship.objects.create(user=self.user, friend=self.user)

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Case, F, Q, When, Window
from django.db.models.functions import RowNumber


class Platform(models.TextChoices):
    CODEFORCES = "codeforces"
    LEETCODE = "leetcode"
    CODECHEF = "codechef"
    ATCODER = "atcoder"


class Verdict(models.TextChoices):
    AC = "AC"
    WA = "WA"
    TLE = "TLE"
    MLE = "MLE"
    RE = "RE"
    CE = "CE"


class User(AbstractUser):
    display_name = models.CharField(max_length=100, blank=True)


class PlatformAccount(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="accounts"
    )
    platform = models.CharField(max_length=20, choices=Platform.choices)
    handle = models.CharField(max_length=100)
    rating = models.IntegerField(null=True, blank=True)
    rank = models.CharField(max_length=50, blank=True)
    solved = models.PositiveIntegerField(default=0)
    last_synced_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "platform"], name="uniq_account_per_platform"
            )
        ]

    def __str__(self):
        return f"{self.handle}@{self.platform}"


class RatingPoint(models.Model):
    account = models.ForeignKey(
        PlatformAccount, on_delete=models.CASCADE, related_name="rating_points"
    )
    contest_name = models.CharField(max_length=200)
    rating = models.IntegerField()
    delta = models.IntegerField()
    place = models.PositiveIntegerField(null=True, blank=True)
    occurred_at = models.DateTimeField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["account", "occurred_at"], name="uniq_rating_point"
            )
        ]
        indexes = [models.Index(fields=["account", "occurred_at"])]


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Problem(models.Model):
    platform = models.CharField(max_length=20, choices=Platform.choices)
    external_id = models.CharField(max_length=100)
    name = models.CharField(max_length=200)
    rating = models.PositiveIntegerField(null=True, blank=True)
    url = models.URLField(blank=True)
    tags = models.ManyToManyField(Tag, related_name="problems", blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["platform", "external_id"], name="uniq_problem_per_platform"
            )
        ]
        indexes = [models.Index(fields=["platform", "rating"])]

    def __str__(self):
        return f"{self.external_id} {self.name}"


class Submission(models.Model):
    account = models.ForeignKey(
        PlatformAccount, on_delete=models.CASCADE, related_name="submissions"
    )
    problem = models.ForeignKey(
        Problem, on_delete=models.CASCADE, related_name="submissions"
    )
    external_id = models.CharField(max_length=100)
    verdict = models.CharField(max_length=10, choices=Verdict.choices)
    language = models.CharField(max_length=50, blank=True)
    submitted_at = models.DateTimeField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["account", "external_id"], name="uniq_submission_per_account"
            )
        ]
        indexes = [
            models.Index(fields=["account", "-submitted_at"]),
            models.Index(fields=["account", "problem", "verdict"]),
        ]

    @staticmethod
    def best_per_problem(account):
        return (
            Submission.objects.filter(account=account)
            .annotate(
                rn=Window(
                    expression=RowNumber(),
                    partition_by=[F("problem_id")],
                    order_by=[
                        Case(When(verdict=Verdict.AC, then=0), default=1).asc(),
                        F("submitted_at").desc(),
                    ],
                )
            )
            .filter(rn=1)
        )


class Contest(models.Model):
    external_id = models.CharField(max_length=100, unique=True)
    platform = models.CharField(max_length=20, choices=Platform.choices)
    name = models.CharField(max_length=200)
    url = models.URLField(blank=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(ends_at__gt=F("starts_at")), name="contest_ends_after_start"
            )
        ]
        indexes = [models.Index(fields=["starts_at"])]

    def __str__(self):
        return self.name


class SavedContest(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_contests",
    )
    contest = models.ForeignKey(
        Contest, on_delete=models.CASCADE, related_name="saved_by"
    )
    remind_minutes_before = models.PositiveIntegerField(default=30)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "contest"], name="uniq_saved_contest"
            )
        ]


class Friendship(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="friendships"
    )
    friend = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="friend_of"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "friend"], name="uniq_friendship"),
            models.CheckConstraint(
                condition=~Q(user=F("friend")), name="no_self_friendship"
            ),
        ]

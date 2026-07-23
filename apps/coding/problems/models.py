from django.conf import settings
from django.db import models
from django.utils.text import slugify



class ProblemTag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Problem(models.Model):

    class Difficulty(models.TextChoices):
        EASY = "EASY", "Easy"
        MEDIUM = "MEDIUM", "Medium"
        HARD = "HARD", "Hard"

    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    difficulty = models.CharField(
        max_length=10,
        choices=Difficulty.choices,
        default=Difficulty.EASY,
    )

    description = models.TextField()
    constraints = models.TextField(blank=True)
    input_format = models.TextField(blank=True)
    output_format = models.TextField(blank=True)

    time_limit = models.PositiveIntegerField(default=1)
    memory_limit = models.PositiveIntegerField(default=256)

    tags = models.ManyToManyField(
        ProblemTag,
        related_name="problems",
        blank=True,
    )

    is_published = models.BooleanField(default=False)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="created_problems",
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Example(models.Model):
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE,
        related_name="examples",
    )

    input = models.TextField()
    output = models.TextField()
    explanation = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = ("problem", "order")

    def __str__(self):
        return f"{self.problem.title} Example {self.order}"


class TestCase(models.Model):
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE,
        related_name="test_cases",
    )

    input = models.TextField()
    expected_output = models.TextField()

    is_sample = models.BooleanField(default=False)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = ("problem", "order")

    def __str__(self):
        return f"{self.problem.title} TestCase {self.order}"
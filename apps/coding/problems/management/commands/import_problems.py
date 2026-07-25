import json
import os

from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify

from apps.coding.problems.models import Problem, ProblemTag


class Command(BaseCommand):
    help = "Import LeetCode problems from JSON"

    def add_arguments(self, parser):
        parser.add_argument(
            "--json",
            type=str,
            required=True,
            help="Path to leetcode_questions.json",
        )

    def handle(self, *args, **options):

        json_path = options["json"]

        if not os.path.exists(json_path):
            raise CommandError(f"File not found: {json_path}")

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        imported = 0
        skipped = 0

        self.stdout.write(
            self.style.SUCCESS(
                f"Found {len(data)} problems.\n"
            )
        )

        for item in data:

            title = item.get("title", "").strip()

            if not title:
                skipped += 1
                continue

            if Problem.objects.filter(title=title).exists():
                skipped += 1
                continue

            difficulty = item.get("difficulty", "Easy").upper()

            if difficulty not in [
                "EASY",
                "MEDIUM",
                "HARD",
            ]:
                difficulty = "EASY"

            description = item.get("description", "")

            problem = Problem.objects.create(
                title=title,
                slug=slugify(title),
                difficulty=difficulty,
                description=description,
                constraints="",
                input_format="",
                output_format="",
                time_limit=1,
                memory_limit=256,
                is_published=True,
            )
            categories = item.get("categories", [])

            for category in categories:

                if not category.strip():
                    continue

                tag, _ = ProblemTag.objects.get_or_create(
                    name=category.strip(),
                    defaults={
                        "slug": slugify(category.strip()),
                    },
                )

                problem.tags.add(tag)

            imported += 1

            if imported % 100 == 0:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Imported {imported} problems..."
                    )
                )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "=" * 50
            )
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully Imported : {imported}"
            )
        )
        self.stdout.write(
            self.style.WARNING(
                f"Skipped : {skipped}"
            )
        )
        self.stdout.write(
            self.style.SUCCESS(
                "=" * 50
            )
        )
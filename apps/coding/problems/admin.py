from django.contrib import admin

from .models import Problem, ProblemTag, Example, TestCase


@admin.register(ProblemTag)
class ProblemTagAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


class ExampleInline(admin.TabularInline):
    model = Example
    extra = 1


class TestCaseInline(admin.TabularInline):
    model = TestCase
    extra = 1


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "difficulty",
        "is_published",
        "created_by",
        "created_at",
    )

    list_filter = (
        "difficulty",
        "is_published",
    )

    search_fields = (
        "title",
        "description",
    )

    filter_horizontal = ("tags",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    inlines = [
        ExampleInline,
        TestCaseInline,
    ]


@admin.register(Example)
class ExampleAdmin(admin.ModelAdmin):
    list_display = (
        "problem",
        "order",
    )

    list_filter = (
        "problem",
    )


@admin.register(TestCase)
class TestCaseAdmin(admin.ModelAdmin):
    list_display = (
        "problem",
        "order",
        "is_sample",
    )

    list_filter = (
        "problem",
        "is_sample",
    )
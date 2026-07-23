from rest_framework import serializers

from .models import (
    Problem,
    ProblemTag,
    Example,
    TestCase,
) 
class ProblemTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProblemTag
        fields = (
            "id",
            "name",
            "slug",
        )
class ExampleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Example
        fields = (
            "id",
            "input",
            "output",
            "explanation",
            "order",
        )
class TestCaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = TestCase
        fields = (
            "id",
            "input",
            "expected_output",
            "order",
        )
class ProblemSerializer(serializers.ModelSerializer):

    difficulty = serializers.CharField(
        source="get_difficulty_display",
        read_only=True,
    )

    class Meta:
        model = Problem
        fields = (
            "id",
            "title",
            "slug",
            "difficulty",
        )
class ProblemDetailSerializer(serializers.ModelSerializer):

    difficulty = serializers.CharField(
        source="get_difficulty_display",
        read_only=True,
    )

    tags = ProblemTagSerializer(
        many=True,
        read_only=True,
    )

    examples = ExampleSerializer(
        many=True,
        read_only=True,
    )

    sample_test_cases = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = (
            "id",
            "title",
            "slug",
            "difficulty",
            "description",
            "constraints",
            "input_format",
            "output_format",
            "time_limit",
            "memory_limit",
            "tags",
            "examples",
            "sample_test_cases",
        )

    def get_sample_test_cases(self, obj):
        sample_test_cases = obj.test_cases.filter(is_sample=True)
        return TestCaseSerializer(
            sample_test_cases,
            many=True,
        ).data
class ProblemCreateUpdateSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        queryset=ProblemTag.objects.all(),
        many=True,
        required=False,
    )

    class Meta:
        model = Problem
        fields = (
            "title",
            "difficulty",
            "description",
            "constraints",
            "input_format",
            "output_format",
            "time_limit",
            "memory_limit",
            "tags",
            "is_published",
        )

    def validate_title(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Problem title must be at least 3 characters."
            )

        return value

    def validate_time_limit(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Time limit must be greater than 0."
            )
        return value

    def validate_memory_limit(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Memory limit must be greater than 0."
            )
        return value
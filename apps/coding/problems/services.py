from django.db import transaction

from .models import Problem

from django.db import transaction

from .models import Example


class ExampleService:

    @staticmethod
    @transaction.atomic
    def create_example(problem, validated_data):

        return Example.objects.create(
            problem=problem,
            **validated_data,
        )

    @staticmethod
    @transaction.atomic
    def update_example(example, validated_data):

        for field, value in validated_data.items():
            setattr(example, field, value)

        example.save()

        return example

    @staticmethod
    @transaction.atomic
    def delete_example(example):
        example.delete()


        
class ProblemService:

    @staticmethod
    @transaction.atomic
    def create_problem(validated_data, created_by):
        tags = validated_data.pop("tags", [])

        problem = Problem.objects.create(
            created_by=created_by,
            **validated_data,
        )

        if tags:
            problem.tags.set(tags)

        return problem

    @staticmethod
    @transaction.atomic
    def update_problem(problem, validated_data):
        tags = validated_data.pop("tags", None)

        for attr, value in validated_data.items():
            setattr(problem, attr, value)

        problem.save()

        if tags is not None:
            problem.tags.set(tags)

        return problem

    @staticmethod
    @transaction.atomic
    def delete_problem(problem):
        problem.delete()

    @staticmethod
    @transaction.atomic
    def publish_problem(problem):
        problem.is_published = True
        problem.save(update_fields=["is_published"])

        return problem

    @staticmethod
    @transaction.atomic
    def unpublish_problem(problem):
        problem.is_published = False
        problem.save(update_fields=["is_published"])

        return problem
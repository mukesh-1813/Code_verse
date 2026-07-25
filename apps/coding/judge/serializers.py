from rest_framework import serializers


class CodeFileSerializer(serializers.Serializer):
    name = serializers.CharField(
        required=False,
        allow_blank=True,
    )

    content = serializers.CharField()


class RunCodeSerializer(serializers.Serializer):
    language = serializers.CharField()

    version = serializers.CharField()

    files = CodeFileSerializer(many=True)

    stdin = serializers.CharField(
        required=False,
        allow_blank=True,
        default="",
    )
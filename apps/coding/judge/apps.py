# apps/coding/judge/apps.py
from django.apps import AppConfig

class JudgeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.coding.judge"   # ✅ Correct

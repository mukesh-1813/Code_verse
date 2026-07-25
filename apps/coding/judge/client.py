import requests
import json
from django.conf import settings


class PistonClient:
    def __init__(self):
        self.base_url = settings.PISTON_BASE_URL
        self.timeout = settings.PISTON_TIMEOUT

    def execute(
        self,
        language,
        version,
        files,
        stdin="",
        args=None,
        compile_timeout=10000,
        run_timeout=3000,
    ):
        payload = {
            "language": language,
            "version": version,
            "files": files,
            "stdin": stdin,
            "args": args or [],
            "compile_timeout": compile_timeout,
            "run_timeout": run_timeout,
        }

        print("\n========== PISTON REQUEST ==========")
        print(json.dumps(payload, indent=4))
        print("====================================")

        response = requests.post(
            f"{self.base_url}/execute",
            json=payload,
            timeout=self.timeout,
        )

        print("\n========== PISTON RESPONSE ==========")
        print("Status:", response.status_code)
        print(response.text)
        print("=====================================\n")

        response.raise_for_status()

        return response.json()
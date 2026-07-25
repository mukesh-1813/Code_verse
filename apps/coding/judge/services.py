from .client import PistonClient


class PistonService:

    @staticmethod
    def execute(**kwargs):
        client = PistonClient()
        return client.execute(**kwargs)
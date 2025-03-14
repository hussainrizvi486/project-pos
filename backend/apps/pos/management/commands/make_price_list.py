from django.core.management.base import BaseCommand
from apps.pos.models.item import PriceList


class Command(BaseCommand):
    help = "Generate price lists"

    def handle(self, *args, **kwargs):
        price_list_types = ["Retail", "Wholesale", "Special", "Standard", "Promotional"]
        currencies = [
            "USD",
            "EUR",
            "GBP",
            "JPY",
            "CAD",
            "AUD",
            "INR",
            "CNY",
            "BRL",
            "MXN",
        ]

        count = 0
        for i in range(1, 51):
            type_index = i % len(price_list_types)
            currency_index = i % len(currencies)

            PriceList.objects.create(
                price_list=f"Price List {i}",
                currency=currencies[currency_index],
                price_list_type=price_list_types[type_index],
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f"{count} price lists created"))

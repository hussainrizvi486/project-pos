import random
from django.core.management.base import BaseCommand
from apps.pos.models.item import Item, Category, UOM, ItemTypeChoices


class Command(BaseCommand):
    help = "Generate 50 random items"

    def handle(self, *args, **kwargs):
        categories = list(Category.objects.all())
        uoms = list(UOM.objects.all())

        if not categories:
            self.stdout.write(
                self.style.ERROR("No categories found. Add some categories first.")
            )
            return

        if not uoms:
            self.stdout.write(
                self.style.WARNING("No UOMs found. Items will have null UOMs.")
            )

        for i in range(1, 51):
            item = Item.objects.create(
                item_type=random.choice(ItemTypeChoices.choices)[0],
                item_name=f"Item {i}",
                category=random.choice(categories),
                description=f"Description for Item {i}",
                disabled=random.choice([True, False]),
                default_uom=random.choice(uoms) if uoms else None,
            )
            self.stdout.write(self.style.SUCCESS(f"Created {item}"))

        self.stdout.write(self.style.SUCCESS("Successfully created 50 items!"))

from django.db import models
from django.utils import timezone
from .main import UOM, BaseModel


class ItemTypeChoices(models.TextChoices):
    PRODUCT = "product", "Product"
    TEMPALTES = "template", "Templates"
    VARIANT = "variant", "VARIANT"


class Category(BaseModel):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name


class Item(BaseModel):
    item_type = models.CharField(
        max_length=255, choices=ItemTypeChoices.choices, default=ItemTypeChoices.PRODUCT
    )
    image = models.ImageField(null=True, blank=True)
    item_name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    disabled = models.BooleanField(default=False)
    variant_of = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True
    )
    default_uom = models.ForeignKey(
        UOM, null=True, blank=True, max_length=255, on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.item_name


class ItemVariant(BaseModel):
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name="item_variant"
    )
    attribute = models.CharField(max_length=255)
    attribute_value = models.CharField(max_length=255)

    def __str__(self):
        return self.item.item_name


class ItemUom(BaseModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    uom = models.ForeignKey(UOM, on_delete=models.CASCADE)
    conversion_factor = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return self.item.item_name

    def save(self, *arg, **kwargs):
        if not self.conversion_factor:
            self.conversion_factor = self.uom.conversion_factor

        super().save(*arg, **kwargs)
        ...


class PriceList(BaseModel):
    price_list = models.CharField(max_length=255)
    currency = models.CharField(max_length=255)
    price_list_type = models.CharField(max_length=255)
    disabled = models.BooleanField(default=False)


class ItemPrice(BaseModel):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    price_list = models.ForeignKey(PriceList, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    valid_from = models.DateField()
    valid_to = models.DateField(null=True, blank=True)

    @property
    def is_valid(self):
        return self.valid_from <= timezone.now().date() <= self.valid_to

    def __str__(self):
        return f"{self.item.item_name} {self.price}"

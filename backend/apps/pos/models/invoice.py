from django.contrib.auth import get_user_model
from django.db import models
from .item import Item, ItemPrice
from .main import UOM, BaseModel


class Customer(BaseModel):
    customer_name = models.CharField(max_length=100)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.customer_name


class POSInvoice(BaseModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    posting_date = models.DateField(auto_now_add=True)
    total_qty = models.DecimalField(max_digits=10, decimal_places=2)
    net_total = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    additional_discount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    outstanding_amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)

    def save(*args, **kwargs):
        return super().save(*args, **kwargs)


class POSInvoicePayment(BaseModel):
    invoice = models.ForeignKey(
        POSInvoice, on_delete=models.CASCADE, related_name="payments"
    )

    payment_mode = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)


class POSInvoiceItem(BaseModel):
    invoice = models.ForeignKey(
        POSInvoice, on_delete=models.CASCADE, related_name="items"
    )
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    uom = models.ForeignKey(UOM, on_delete=models.CASCADE)
    conversion_factor = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    qty = models.DecimalField(max_digits=10, decimal_places=2)
    item_price_list = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)
    net_rate = models.DecimalField(max_digits=10, decimal_places=2)
    rate = models.DecimalField(max_digits=10, decimal_places=2)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class POSInvoiceTax(BaseModel):
    invoice = models.ForeignKey(POSInvoice, on_delete=models.CASCADE)
    tax_type = models.CharField(max_length=255)
    tax_rate = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

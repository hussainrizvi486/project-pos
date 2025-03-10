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
    # invoice_no = models.CharField(max_length=100, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    posting_date = models.DateField(auto_now_add=True)
    total_qty = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    additional_discount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0
    )
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    outstanding_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def generate_invoice_no(self):
        if not self.invoice_no:
            # Get the last invoice to determine the next number
            last_invoice = POSInvoice.objects.order_by("-invoice_no").first()
            if (
                last_invoice
                and last_invoice.invoice_no
                and "#INV-" in last_invoice.invoice_no
            ):
                try:
                    last_num = int(last_invoice.invoice_no.split("-")[1])
                    self.invoice_no = f"#INV-{last_num + 1:03d}"
                except (IndexError, ValueError):
                    self.invoice_no = "#INV-001"
            else:
                self.invoice_no = "#INV-001"

    def calculate_totals(self):
        # Calculate total quantity and net total from items
        items = self.items.all()

        self.total_qty = sum(item.qty for item in items)
        self.net_total = sum(item.amount for item in items)

        # Calculate tax amount
        taxes = POSInvoiceTax.objects.filter(invoice=self)
        self.tax_amount = sum(tax.tax_amount for tax in taxes)

        # Calculate discount amount
        self.discount_amount = (
            sum(item.discount for item in items) + self.additional_discount
        )

        # Calculate grand total
        self.grand_total = self.net_total + self.tax_amount - self.additional_discount

        # Calculate paid and outstanding amounts
        payments = self.payments.all()
        self.paid_amount = sum(payment.amount for payment in payments)
        self.outstanding_amount = self.grand_total - self.paid_amount

    def save(self, *args, **kwargs):
        self.generate_invoice_no()
        self.calculate_totals()
        super().save(*args, **kwargs)


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
    uom = models.ForeignKey(UOM, on_delete=models.CASCADE, null=True, blank=True)
    conversion_factor = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    qty = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    item_price_list = models.ForeignKey(
        ItemPrice, on_delete=models.CASCADE, null=True, blank=True
    )
    net_rate = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rate = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        # Calculate amount based on qty and rate
        self.rate = self.net_rate
        self.amount = self.qty * self.rate - self.discount

        super().save(*args, **kwargs)
        # Recalculate invoice totals when an item is saved
        self.invoice.calculate_totals()
        self.invoice.save()


class POSInvoiceTax(BaseModel):
    invoice = models.ForeignKey(POSInvoice, on_delete=models.CASCADE)
    tax_type = models.CharField(max_length=255)
    tax_rate = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

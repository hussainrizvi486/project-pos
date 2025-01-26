from django.db import models
from .item import Item

class POSInvoice(models.Model):
    posting_date = models.DateField(auto_now_add=True) 
    customer = models.ForeignKey()
    grand_total =models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_qty = models.DecimalField(max_digits=10, decimal_places=2)    
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    net_total  =models.DecimalField(max_digits=10, decimal_places=2)
    outstanding_amount = models.DecimalField(max_digits=10, decimal_places=2)


class POSInvoicePayment(models.Model):
    invoice = models.ForeignKey(POSInvoice, on_delete=models.CASCADE)
    payment_mode = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)



class POSInvoiceItem(models.Model):
    item = models.ForeignKey(Item)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    qty = models.DecimalField(max_digits=10, decimal_places=2)
    net_amount = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    uom = models.CharField(max_length=255)


    def save(self, *args, **kwargs):
        self.net_amount = self.rate * self.qty
        self.amount = self.net_amount - self.discount_amount
        super().save(*args, **kwargs)



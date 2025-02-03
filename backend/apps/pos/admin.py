from django.contrib import admin
from .models.item import Item, Category, ItemVariant
from .models.invoice import POSInvoice, POSInvoiceItem, POSInvoicePayment, POSInvoiceTax, Customer




admin.site.register(Category)
admin.site.register(Customer)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    class VariantInline(admin.TabularInline):
        model = ItemVariant

    inlines = [VariantInline]


@admin.register(POSInvoice)
class POSInvoiceAdmin(admin.ModelAdmin):
    class POSInvoicePaymentInline(admin.TabularInline):
        model = POSInvoicePayment
        extra = 1

    class POSInvoiceItemInline(admin.TabularInline):
        model = POSInvoiceItem
        extra = 1

    class POSInvoiceTaxInline(admin.TabularInline):
        model = POSInvoiceTax
        extra = 1

    inlines = [POSInvoicePaymentInline, POSInvoiceItemInline, POSInvoiceTaxInline]

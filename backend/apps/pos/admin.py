from django.contrib import admin
from .models.item import Item, Category, ItemVariant


admin.site.register(Category)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    class VariantInline(admin.TabularInline):
        model = ItemVariant

    inlines = [VariantInline]

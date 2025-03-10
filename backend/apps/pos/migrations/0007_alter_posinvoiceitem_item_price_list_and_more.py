# Generated by Django 5.1.5 on 2025-03-09 17:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0006_alter_posinvoiceitem_item_price_list_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posinvoiceitem',
            name='item_price_list',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pos.itemprice'),
        ),
        migrations.AlterField(
            model_name='posinvoiceitem',
            name='uom',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pos.uom'),
        ),
    ]

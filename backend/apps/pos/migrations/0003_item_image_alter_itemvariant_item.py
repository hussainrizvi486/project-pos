# Generated by Django 5.1.5 on 2025-01-29 21:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0002_alter_item_default_uom'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='items'),
        ),
        migrations.AlterField(
            model_name='itemvariant',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item_variant', to='pos.item'),
        ),
    ]

# Generated by Django 5.1.5 on 2025-02-22 21:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='default_uom',
            field=models.ForeignKey(blank=True, max_length=255, null=True, on_delete=django.db.models.deletion.SET_NULL, to='pos.uom'),
        ),
    ]

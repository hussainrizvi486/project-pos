# Generated by Django 5.1.5 on 2025-03-09 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0008_posinvoice_invoice_no'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posinvoice',
            name='invoice_no',
        ),
    ]

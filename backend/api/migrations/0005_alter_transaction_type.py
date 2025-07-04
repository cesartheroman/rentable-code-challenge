# Generated by Django 5.2.3 on 2025-06-25 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_transaction_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transaction",
            name="type",
            field=models.CharField(
                choices=[("charge", "Charge"), ("payment", "Payment")],
                default="charge",
                max_length=7,
            ),
            preserve_default=False,
        ),
    ]

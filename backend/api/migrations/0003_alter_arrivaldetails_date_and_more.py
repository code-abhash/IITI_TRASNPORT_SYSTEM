# Generated by Django 5.1.2 on 2024-11-11 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_bookings_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='arrivaldetails',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='arrivaldetails',
            name='drop_off_location',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='arrivaldetails',
            name='pickup_location',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='arrivaldetails',
            name='time',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='arrivaldetails',
            name='type_of_vehicle',
            field=models.CharField(max_length=100, null=True),
        ),
    ]

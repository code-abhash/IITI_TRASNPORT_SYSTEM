from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    user_type=models.CharField(max_length=50)
    email_id=models.EmailField(unique=True, null=False)

    def _str_(self):
        return f"{self.username},{self.first_name},{self.last_name}"
    
class Student(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    
    def _str_(self):
        return self.user.username
    
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=255)
    hod = models.CharField(max_length=255)
    total_bills = models.DecimalField(max_digits=10, decimal_places=2)
    
class Faculty(models.Model):
    department_id = models.ForeignKey('Department', on_delete=models.CASCADE)
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    
    def _str_(self):
        return self.user.username
    
class Driver(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    phone_no=models.CharField(max_length=20)
    

    def _str_(self):
        return self.user.username
    
class Vehicle(models.Model):
    driver=models.OneToOneField(Driver,on_delete=models.CASCADE)
    vehicle_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=100)
    capacity = models.IntegerField()
    vehicle_status = models.CharField(max_length=100)
    vehicle_number = models.CharField(max_length=20)

class Admin(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)

class Notifications(models.Model):
    notification_id = models.AutoField(primary_key=True)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)


class Bookings(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, null=True)
    type_of_booking = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=20)
    any_specific_details=models.TextField()
    name_user=models.CharField(max_length=100, null=True)


# DEPARTURE DETAILS model
class DepartureDetails(models.Model):
    departure_id = models.AutoField(primary_key=True)
    booking_id = models.ForeignKey(Bookings, on_delete=models.CASCADE)
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True)
    drop_off_location = models.CharField(max_length=255, null=True)
    pickup_location = models.CharField(max_length=255, null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    type_of_vehicle = models.CharField(max_length=100, null=True)

# ARRIVAL DETAILS model
class ArrivalDetails(models.Model):
    arrival_id = models.AutoField(primary_key=True)
    booking_id = models.ForeignKey(Bookings, on_delete=models.CASCADE)
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True)
    drop_off_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    type_of_vehicle = models.CharField(max_length=100)

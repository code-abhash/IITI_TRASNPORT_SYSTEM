from rest_framework import serializers
from api.models import *

class UserSerializer(serializers.ModelSerializer):
    cnf_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email_id', 'password', 'cnf_password','first_name', 'last_name', 'user_type']
        extra_kwargs = {'password': {'write_only': True},
                        'cnf_password':{'write_only':True}
                        }

    def create(self, validated_data):
        cnf_password=validated_data.pop('cnf_password')
        if validated_data['password']!= cnf_password:
            raise serializers.ValidationError({"password:password did not match"})
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'user']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['department_id', 'department_name', 'hod', 'total_bills']

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'department_id', 'user']

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ['id', 'user', 'phone_no']

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['vehicle_id', 'driver', 'type', 'capacity', 'vehicle_status', 'vehicle_number']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ['notification_id', 'admin_id', 'message', 'date']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ['booking_id', 'user_id', 'fare', 'status', 'type_of_booking', 'contact_number']

class DepartureDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartureDetails
        fields = ['departure_id', 'booking_id', 'vehicle_id', 'drop_off_location', 'pickup_location', 'date', 'time', 'type_of_vehicle']

class ArrivalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArrivalDetails
        fields = ['arrival_id', 'booking_id', 'vehicle_id', 'drop_off_location', 'pickup_location', 'date', 'time', 'type_of_vehicle']

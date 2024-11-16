from rest_framework import serializers
from api.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user_type'] = user.user_type
        token['email'] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type
        data['email'] = self.user.email
        return data
    

class UserSerializer(serializers.ModelSerializer):
    cnf_password = serializers.CharField(write_only=True)
    is_superuser = serializers.BooleanField()
    class Meta:
        model = User
        fields = ['id', 'username', 'email_id', 'password', 'cnf_password','first_name', 'last_name', 'user_type','is_superuser']
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
        send_mail(
            'Welcome to Our Platform!',
            f'Hello {user.username}, thank you for signing up!',
            settings.EMAIL_HOST_USER,
            [user.email_id],
            fail_silently=False,
        )
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
        fields = ['driver_id', 'name', 'phone_no']

# Vehicle Serializer
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['vehicle_id', 'driver', 'type', 'capacity', 'vehicle_status', 'vehicle_number']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ['notification_id', 'message', 'date']

# Serializer for the Bookings model
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ['booking_id', 'user_id', 'type_of_booking', 'contact_number', 'any_specific_details', 'name_user', 'status']

# Serializer for the DepartureDetails model
class DepartureDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartureDetails
        fields = ['departure_id', 'booking_id', 'drop_off_location', 'pickup_location', 'date', 'time', 'type_of_vehicle']

# Serializer for the ArrivalDetails model
class ArrivalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArrivalDetails
        fields = ['arrival_id', 'booking_id', 'drop_off_location', 'pickup_location', 'date', 'time', 'type_of_vehicle']


class PasswordResetSerializer(serializers.Serializer):
    username = serializers.CharField()

     # Validating the username to ensure the user exists.
    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError("There is no user registered with this username.")
        return value
      
     # Sending a password reset email to the user.  
    def send_password_reset_email(self, user):
        token = default_token_generator.make_token(user)
        
        full_url = f"http://localhost:5173/reset/{user.username}/{token}/"
        send_mail(
            'Password Reset Request',
            f'Dear {user.username},\n\n We recieved password request.'
            f'Click the link to reset your password: {full_url}\n\n\n Thank you, \n for your regards',
            settings.DEFAULT_FROM_EMAIL,
            [user.email_id]
        )
     # Saving the validated data and sending the reset email.
    def save(self):
        username = self.validated_data['username']
        user = User.objects.get(username=username)
        self.send_password_reset_email(user)
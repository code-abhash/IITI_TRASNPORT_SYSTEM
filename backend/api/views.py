# views.py
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .models import User, Student, Department, Faculty, Driver, Vehicle, Notifications, Bookings, DepartureDetails, ArrivalDetails
from api.serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db import transaction
import sys
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUserList(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        superuser=self.kwargs.get('is_superuser',None)
        if username:
            return User.objects.filter(username=username)
        if superuser is not None:
            return User.objects.filter(is_superuser=bool(int(superuser)))
        return User.objects.all()

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer




class FacultyListCreateView(generics.ListCreateAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

class DriverListCreateView(generics.ListCreateAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class VehicleListView(APIView):
    def get(self, request):
        vehicles = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class NotificationView(APIView):

    def get(self, request):
        notifications = Notifications.objects.all().order_by('-date')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            notification = Notifications.objects.get(pk=pk)
            notification.delete()
            return Response({"message": "Notification deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Notifications.DoesNotExist:
            return Response({"error": "Notification not found"}, status=status.HTTP_404_NOT_FOUND)

class ProfileBookingView(APIView):
    def get(self, request):
        bookings = Bookings.objects.filter(user_id = request.user.id)
        booking_data = []

        for booking in bookings:
            booking_serialized = BookingSerializer(booking).data

            arrival_details = ArrivalDetails.objects.filter(booking_id=booking.booking_id)
            departure_details = DepartureDetails.objects.filter(booking_id=booking.booking_id)
            booking_serialized['arrival_details'] = ArrivalDetailsSerializer(arrival_details, many=True).data
            booking_serialized['departure_details'] = DepartureDetailsSerializer(departure_details, many=True).data

            booking_data.append(booking_serialized)

        return Response(booking_data, status=status.HTTP_200_OK)

class BookingView(APIView):
    def get(self, request):
        bookings = Bookings.objects.all()
        booking_data = []

        for booking in bookings:
            booking_serialized = BookingSerializer(booking).data

            arrival_details = ArrivalDetails.objects.filter(booking_id=booking.booking_id)
            departure_details = DepartureDetails.objects.filter(booking_id=booking.booking_id)
            booking_serialized['arrival_details'] = ArrivalDetailsSerializer(arrival_details, many=True).data
            booking_serialized['departure_details'] = DepartureDetailsSerializer(departure_details, many=True).data

            booking_data.append(booking_serialized)

        return Response(booking_data, status=status.HTTP_200_OK)

    def post(self, request):
        print("Request Method:", request.method)
        print("Request Headers:", request.headers)
        print("Request Data:", request.data)

        booking_data = request.data.get('booking')
        arrival_data = request.data.get('arrival_details')
        departure_data = request.data.get('departure_details')
        booking_data['user_id'] = request.user.id

        with transaction.atomic():
            booking_serializer = BookingSerializer(data=booking_data)
            if booking_serializer.is_valid():
                booking = booking_serializer.save()

                if arrival_data["drop_off_location"] != '':
                    arrival_data["booking_id"] = booking.booking_id
                    arrival_serializer = ArrivalDetailsSerializer(data=arrival_data)
                    if arrival_serializer.is_valid():
                        arrival_serializer.save()
                    else:
                        transaction.set_rollback(True)
                        return Response(arrival_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                if departure_data["drop_off_location"] != '':
                    departure_data["booking_id"] = booking.booking_id
                    departure_serializer = DepartureDetailsSerializer(data=departure_data)        
                    if departure_serializer.is_valid():
                        departure_serializer.save()
                    else:
                        transaction.set_rollback(True)
                        return Response(departure_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # Send email notification after booking is saved
                if booking.user_id.email_id:
                    send_mail(
                        subject='New Booking Created',
                        message=f"Hello {booking.user_id.username},\n\nYour booking (ID: {booking.booking_id}) has been successfully created. You will be notified once it's confirmed.\n\nThank you for choosing our service!",
                        from_email=settings.EMAIL_HOST_USER,
                        recipient_list=[booking.user_id.email_id],
                        fail_silently=False,
                    )

                return Response(booking_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View to add a driver
@api_view(['POST'])  # Only handle POST requests
def add_driver(request):
    if request.method == 'POST':
        serializer = DriverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Respond with created data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Handle invalid data

    # Handle other HTTP methods like GET or PUT if needed (optional)
    return Response({"message": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Add a new vehicle
@api_view(['POST'])
def add_vehicle(request):
    if request.method == 'POST':
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_drivers(request):
    drivers = Driver.objects.all()
    serializer = DriverSerializer(drivers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def confirm_booking(request):
    try:
        booking_id = request.data.get('booking_id')
        status_update = request.data.get('status', 'confirmed')
        arrival_vehicle_id = request.data.get('arrival_vehicle_id')
        departure_vehicle_id = request.data.get('departure_vehicle_id')

        # Fetch the booking object
        booking = Bookings.objects.get(booking_id=booking_id)
        
        # Update booking status
        booking.status = status_update
        booking.save()
        if booking.user_id.email_id:  # Assuming user_id is a foreign key to the user model
            send_mail(
                subject='Booking Confirmation',
                message=f"Hello {booking.user_id.username},\n\nYour booking (ID: {booking_id}) has been successfully confirmed. You can check your arrival and departure details in your account.\n\nThank you for choosing our service!",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[booking.user_id.email_id],
                fail_silently=False,
            )
        
        # Update arrival details, if they exist
        try:
            arrival_details = ArrivalDetails.objects.get(booking_id=booking_id)
            if arrival_vehicle_id:
                arrival_vehicle = Vehicle.objects.get(vehicle_id=arrival_vehicle_id)
                arrival_details.vehicle_id = arrival_vehicle
                arrival_details.save()
        except ArrivalDetails.DoesNotExist:
            # Skip updating arrival details if they don't exist
            pass
        
        # Update departure details, if they exist
        try:
            departure_details = DepartureDetails.objects.get(booking_id=booking_id)
            if departure_vehicle_id:
                departure_vehicle = Vehicle.objects.get(vehicle_id=departure_vehicle_id)
                departure_details.vehicle_id = departure_vehicle
                departure_details.save()
        except DepartureDetails.DoesNotExist:
            # Skip updating departure details if they don't exist
            pass

        # Send confirmation email
        

        return Response({"message": "Booking confirmed, vehicle IDs updated, and confirmation email sent."}, status=status.HTTP_200_OK)
    
    except Bookings.DoesNotExist:
        return Response({"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
    except Vehicle.DoesNotExist:
        return Response({"error": "Vehicle not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getDriverDetailsArrival(request):
    arrival_id = request.data.get('arrival_id')
    arrival = ArrivalDetails.objects.get(arrival_id=arrival_id)
    print(arrival)
    vehicle_id = arrival.vehicle_id.vehicle_id
    print(vehicle_id)
    vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
    driver_id = vehicle.driver_id
    print(driver_id)
    driver = Driver.objects.get(driver_id=driver_id)
    name = driver.name
    number = driver.phone_no
    driver_details = []
    driver_details.append(name)
    driver_details.append(number)
    print(driver_details)
    return Response(driver_details, status=status.HTTP_200_OK)

@api_view(['POST'])
def getDriverDetailsDeparture(request):
    departure_id = request.data.get('departure_id')
    departure = DepartureDetails.objects.get(departure_id=departure_id)
    print(departure)
    vehicle_id = departure.vehicle_id.vehicle_id
    vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
    print(vehicle_id)
    driver_id = vehicle.driver_id
    print(driver_id)
    driver = Driver.objects.get(driver_id=driver_id)
    name = driver.name
    number = driver.phone_no
    driver_details = []
    driver_details.append(name)
    driver_details.append(number)
    print(driver_details)
    return Response(driver_details, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_vehicle(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
    except Vehicle.DoesNotExist:
        return Response({'detail': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)

    # Deserialize the incoming request data and validate it
    serializer = VehicleSerializer(vehicle, data=request.data)
    if serializer.is_valid():
        # Save the updated vehicle data to the database
        serializer.save()
        return Response({'detail': 'Vehicle updated successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def update_driver(request, driver_id):
    try:
        driver = Driver.objects.get(driver_id=driver_id)
    except Driver.DoesNotExist:
        return Response({'detail': 'Driver not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = DriverSerializer(driver, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'detail': 'Driver updated successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

User = get_user_model()

@api_view(['GET'])
def get_user_details(request):
    user = request.user

    user_serializer = UserSerializer(user)
    user_data = user_serializer.data
    print(user_data)
    # Add additional fields based on user_type
    user_details=[]
    name=user_data['username']
    user_details.append(name)
    print(name)
    email=user_data['email_id']
    user_details.append(email)
    type=user_data['user_type']
    user_details.append(type)
    super_user=user_data['is_superuser']
    user_details.append(super_user)
    print(user_details)



    # Return combined user data with role-specific information
    return Response(user_details, status=status.HTTP_200_OK)


@api_view(['POST'])
def confirm_booking(request):
    try:
        # Extract data from the request
        booking_id = request.data.get('booking_id')
        status_update = request.data.get('status', 'confirmed')
        arrival_vehicle_id = request.data.get('arrival_vehicle_id')
        departure_vehicle_id = request.data.get('departure_vehicle_id')

        if not booking_id:
            return Response({"error": "Booking ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the booking object
        booking = Bookings.objects.get(booking_id=booking_id)
        booking.status = status_update
        booking.save()

        # Assign vehicles to arrival and departure details if they exist
        assign_vehicle_to_detail(ArrivalDetails, booking_id, arrival_vehicle_id)
        assign_vehicle_to_detail(DepartureDetails, booking_id, departure_vehicle_id)

        # Prepare success response with details
        return Response({
            "message": "Booking confirmed and vehicle IDs updated successfully.",
            "booking_id": booking_id,
            "status": status_update,
            "arrival_vehicle_id": arrival_vehicle_id,
            "departure_vehicle_id": departure_vehicle_id
        }, status=status.HTTP_200_OK)

    except Bookings.DoesNotExist:
        return Response({"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
    except Vehicle.DoesNotExist:
        return Response({"error": "Vehicle not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

def assign_vehicle_to_detail(model, booking_id, vehicle_id):
    """
    Utility function to assign a vehicle to either ArrivalDetails or DepartureDetails.
    """
    if vehicle_id:
        try:
            detail = model.objects.get(booking_id=booking_id)
            vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
            detail.vehicle_id = vehicle
            detail.save()
        except model.DoesNotExist:
            # No action needed if detail does not exist for the booking
            pass


class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API view to handle password reset confirmation
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, username, token):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

        password = request.data.get("password")
        if not password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()
        return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
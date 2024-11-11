# views.py

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
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUserList(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.kwargs.get('username', None)
        if username:
            return User.objects.filter(username=username)
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

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer



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
    
        # Print request headers
        print("Request Headers:", request.headers)
        
        # Print the entire request data (all submitted fields)
        print("Request Data:", request.data)

        # If you need to access individual fields in the request data
        booking_data = request.data.get('booking')
        arrival_data = request.data.get('arrival_details')
        departure_data = request.data.get('departure_details')
        booking_data['user_id'] = request.user.id
        print("Booking Data:", booking_data)
        print("Arrival Details:", arrival_data)
        print("Departure Details:", departure_data)


        with transaction.atomic():
            # Save Booking Details
            booking_serializer = BookingSerializer(data=booking_data)
            if booking_serializer.is_valid():
                booking = booking_serializer.save()

                # Save Arrival Details
                arrival_data["booking_id"] = booking.booking_id
                arrival_serializer = ArrivalDetailsSerializer(data=arrival_data)
                if arrival_serializer.is_valid():
                    arrival_serializer.save()
                else:
                    transaction.set_rollback(True)
                    return Response(arrival_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # Save Departure Details
                if departure_data["drop_off_location"] != '':
                    departure_data["booking_id"] = booking.booking_id
                    departure_serializer = DepartureDetailsSerializer(data=departure_data)        
                    if departure_serializer.is_valid():
                        departure_serializer.save()
                    else:
                        transaction.set_rollback(True)
                        return Response(departure_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
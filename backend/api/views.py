# views.py

from rest_framework import generics
from rest_framework.decorators import api_view
from .models import User, Student, Department, Faculty, Driver, Vehicle, Notifications, Bookings, DepartureDetails, ArrivalDetails
from api.serializers import *
from rest_framework.response import Response


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


class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notifications.objects.all()
    serializer_class = NotificationSerializer


class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Bookings.objects.all()
    serializer_class = BookingSerializer


class DepartureDetailsListCreateView(generics.ListCreateAPIView):
    queryset = DepartureDetails.objects.all()
    serializer_class = DepartureDetailsSerializer

class ArrivalDetailsListCreateView(generics.ListCreateAPIView):
    queryset = ArrivalDetails.objects.all()
    serializer_class = ArrivalDetailsSerializer


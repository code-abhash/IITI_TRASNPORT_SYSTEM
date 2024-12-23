# urls.py

from django.urls import path
from api.views import *

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('faculties/', FacultyListCreateView.as_view(), name='faculty-list-create'),
    path('drivers/', DriverListCreateView.as_view(), name='driver-list-create'),
    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('notifications/', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('bookings/', BookingListCreateView.as_view(), name='booking-list-create'),
    path('departure-details/', DepartureDetailsListCreateView.as_view(), name='departure-details-list-create'),
    path('arrival-details/', ArrivalDetailsListCreateView.as_view(), name='arrival-details-list-create'),
]

# urls.py

from django.urls import path
from api.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<str:username>/', GetUserList.as_view(), name='user-detail'),  # Specific username filter
    path('userslist/', GetUserList.as_view(), name='user-list'),
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('faculties/', FacultyListCreateView.as_view(), name='faculty-list-create'),
    path('drivers/', DriverListCreateView.as_view(), name='driver-list-create'),
    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('bookings/', BookingView.as_view(), name='booking-list-create'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notifications/', NotificationView.as_view(), name='notification-list-create'),
    path('notifications/<int:pk>/', NotificationView.as_view(), name='notification-detail'),  # For DELETE request
]

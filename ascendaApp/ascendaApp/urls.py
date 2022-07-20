"""ascendaApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework.urlpatterns import format_suffix_patterns
from ascendaApp import views

from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'getHotelView', views.HotelViewSet, basename='getHotelView')

urlpatterns = [
    # path('api/', include('mynewapp.urls')),
    #path('', views.index, name='main-view'),
    #path('index/', views.index, name='main-view'),
    path('booking/', views.booking, name='booking-view'),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path("", views.front, name="front"),
    # path('api/', include(router.urls)),
    path('api2/', views.list_hotels),
    path('api3/<int:pk>/', views.detail_hotel),
]

urlpatterns = format_suffix_patterns(urlpatterns)

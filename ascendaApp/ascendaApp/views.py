from django.shortcuts import render
from rest_framework import viewsets
from .models import Hotel, HotelSerializer

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Create your views here.
def index(request):
    print(BASE_DIR)
    return render(request, BASE_DIR / 'build/index.html')

def booking(request):
    return render(request, BASE_DIR / 'src/bookings/index.html')

def front(request):
    context = { }
    return render(request, "index.html", context)

def loadPage(request):
    context = { }
    return render(request, "booking.html", context)

class HotelViewSet(viewsets.ModelViewSet):
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()

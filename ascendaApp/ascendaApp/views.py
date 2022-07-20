from django.shortcuts import render
from rest_framework import viewsets, serializers, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Hotel

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

@api_view(['GET', 'POST'])
def list_hotels(request, format=None):
  """
  List all code snippets, or create a new Hotel.
  csrf exempt for clients that do not have CSRF token
  """
  if request.method == 'GET':
    hotels = Hotel.objects.all()
    serializer = HotelSerializer(hotels, many=True)
    return Response(serializer.data)

  elif request.method == 'POST':
    data = JSONParser().parse(request)
    serializer = HotelSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def detail_hotel(request, pk, format=None):
  """
  Retrieve, update or delete a code Hotel.
  """
  try:
      hotel = Hotel.objects.get(pk=pk)
  except Hotel.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
      serializer = HotelSerializer(hotel)
      return Response(serializer.data)

  elif request.method == 'PUT':
      data = JSONParser().parse(request)
      serializer = HotelSerializer(hotel, data=data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  elif request.method == 'DELETE':
      hotel.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

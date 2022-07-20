import math

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
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

def getLatitudeBounds(lat, metres):
  # conversion using haversine
  return (lat - metres / 111320, lat + metres + 111320)

def getLongitudeBounds(lat, lng, metres):
  # conversion using haversine
  degLength = 40075000 * math.cos(lat) / 360
  return (lng - metres / degLength, lng + metres / degLength)

@api_view(['GET', 'POST'])
def list_hotels(request, format=None):
  """
  List all code snippets, or create a new Hotel.
  csrf exempt for clients that do not have CSRF token
  """
  if request.method == 'GET':
    name = request.query_params.get('name')
    reviewScore = request.query_params.get('reviewScore')
    price = request.query_params.get('price')
    lat = request.query_params.get('lat')
    lng = request.query_params.get('lng')
    distance = request.query_params.get('distance')
    customerType = request.query_params.get('customerType')
    
    hotels = Hotel.objects
    if name is not None:
      hotels = hotels.filter(name__contains=name)
    if reviewScore is not None:
      hotels = hotels.filter(reviewScore__gte=reviewScore)
    if price is not None:
      hotels = hotels.filter(price__lte=price)
    if customerType is not None:
      hotels = hotels.filter(customerType=customerType)
    if lat is not None and lng is not None and distance is not None:
      latMin, latMax = getLatitudeBounds(lat, distance)
      lngMin, lngMax = getLongitudeBounds(lat, lng, distance)
      hotels = hotels.filter(
        lat__gte=latMin, lat__lng=latMax,
        lng__gte=lngMin, lng__lte=lngMax)
    
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

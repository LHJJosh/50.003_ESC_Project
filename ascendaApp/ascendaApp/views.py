from enum import unique
import math
import requests
import json

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Hotel, HotelSerializer, \
    BookingInfo, BookingsSerializer, \
    Destination, DestinationSerialiser

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Create your views here


def index(request):
    print(BASE_DIR)
    return render(request, BASE_DIR / 'build/index.html')


def booking(request):
    return render(request, BASE_DIR / 'src/bookings/index.html')


def front(request):
    context = {}
    return render(request, "index.html", context)


def loadPage(request):
    context = {}
    return render(request, "booking.html", context)


def getLatitudeBounds(lat, metres):
    # conversion using haversine
    return (lat - metres / 111320, lat + metres + 111320)


def getLongitudeBounds(lat, lng, metres):
    # conversion using haversine
    degLength = 40075000 * math.cos(lat) / 360
    return (lng - metres / degLength, lng + metres / degLength)


@api_view(['GET', 'POST'])
def list_hotels_internal(request, format=None):
    """
    List all code snippets, or create a new Hotel.
    """
    if request.method == 'GET':
        name = request.query_params.get('name')
        destination = request.query_params.get('destination')
        rooms = request.query_params.get('rooms')
        reviewScore = request.query_params.get('reviewScore')
        price = request.query_params.get('price')
        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')
        distance = request.query_params.get('distance')
        customerType = request.query_params.get('customerType')
        destination = request.query_params.get('destination')

        hotels = Hotel.objects
        if name is not None:
            hotels = hotels.filter(name__contains=name)
        if destination is not None:
            hotels = hotels.filter(destination__contains=destination)
        if rooms is not None:
            hotels = hotels.filter(rooms__gte=rooms)
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
def detail_hotel_internal(request, pk, format=None):
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


@api_view(['GET', 'POST', 'DELETE'])
def bookings(request, format=None):
    """
    List all code snippets, or create a new booking.
    """
    if request.method == 'GET':
        bookings = BookingInfo.objects
        serializer = BookingsSerializer(bookings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BookingsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        uid = request.query_params.get('uid')
        booking = BookingInfo.objects.filter(uid=uid)
        print(booking)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def destinations(request, format=None):
    """
    """
    if request.method == 'GET':
        term = request.query_params.get('term')

        destinations = Destination.objects
        if term is not None:
            destinations = destinations.filter(term__contains=term)
        serializer = DestinationSerialiser(destinations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DestinationSerialiser(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def hotels(request, format=None):
    if request.method == 'GET':
        destination_id = request.query_params.get('destination_id')
        checkin = request.query_params.get('checkin')
        checkout = request.query_params.get('checkout')
        guests = request.query_params.get('guests')

        url = f'https://hotelapi.loyalty.dev/api/hotels' + \
            f'?destination_id={destination_id}' + \
            f'&checkin={checkin}' + \
            f'&checkout={checkout}' + \
            f'&guests={guests}'

        res = requests.get(url)
        data = json.loads(res.content)

        if res.status_code == 200:
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(res.content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def hotel_detail(request, format=None):
    if request.method == 'GET':
        hotel_id = request.query_params.get('hotel_id')

        url = f'https://hotelapi.loyalty.dev/api/hotels/{hotel_id}'
        res = requests.get(url)
        data = json.loads(res.content)

        if res.status_code == 200:
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(res.content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def hotel_price(request, format=None):
    if request.method == 'GET':
        destination_id = request.query_params.get('destination_id')
        checkin = request.query_params.get('checkin')
        checkout = request.query_params.get('checkout')
        guests = request.query_params.get('guests')

        url = f'https://hotelapi.loyalty.dev/api/hotels/prices?currency=SGD&partner_id=1' + \
            f'&destination_id={destination_id}' + \
            f'&checkin={checkin}' + \
            f'&checkout={checkout}' + \
            f'&guests={guests}'
        print(url)
        res = requests.get(url)
        data = json.loads(res.content)

        if res.status_code == 200:
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(res.content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def rooms(request, format=None):
    if request.method == 'GET':
        hotel_id = request.query_params.get('hotel_id')
        destination_id = request.query_params.get('destination_id')
        checkin = request.query_params.get('checkin')
        checkout = request.query_params.get('checkout')
        guests = request.query_params.get('guests')

        url = f'https://hotelapi.loyalty.dev/api/hotels' + \
            f'/{hotel_id}/price?currency=SGD&partner_id=1' + \
            f'&destination_id={destination_id}' + \
            f'&checkin={checkin}' + \
            f'&checkout={checkout}' + \
            f'&guests={guests}'
        print(url)
        res = requests.get(url)
        data = json.loads(res.content)
        print(data['completed'])
        if res.status_code == 200:
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(res.content, status=status.HTTP_400_BAD_REQUEST)

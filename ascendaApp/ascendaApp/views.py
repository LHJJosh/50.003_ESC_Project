from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import serializers
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


class HotelSerializer(serializers.Serializer):
  id = serializers.IntegerField(read_only=True)
  name = serializers.CharField(required=False, allow_blank=True, max_length=256)
  reviewScore = serializers.DecimalField(decimal_places=5, max_digits=6, required=False)
  price = serializers.DecimalField(decimal_places=2, max_digits=8, required=False)
  customerType = serializers.CharField(required=False, allow_blank=True, max_length=2)

  address = serializers.CharField(required=False, allow_blank=True, max_length=256)
  lat = serializers.DecimalField(decimal_places=5, max_digits=8, required=False)
  lng = serializers.DecimalField(decimal_places=5, max_digits=8, required=False)

  reviewCount = serializers.JSONField()

  def create(self, validated_data):
    return Hotel.objects.create(**validated_data)
  
  def update(self, instance, validated_data):
    instance.name = validated_data.get('name', instance.name)
    instance.reviewScore = validated_data.get('reviewScore', instance.reviewScore)
    instance.price = validated_data.get('price', instance.price)
    instance.customerType = validated_data.get('customerType', instance.customerType)
    instance.address = validated_data.get('address', instance.name)
    instance.lat = validated_data.get('lat', instance.lat)
    instance.lng = validated_data.get('lng', instance.lng)
    instance.save()
    return instance


class HotelViewSet(viewsets.ModelViewSet):
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()

from rest_framework import serializers
from .models import Hotel

class Serializer(serializers.ModelSerializer):
  class Meta:
    model = Hotel
    fields = (
      'name', 'reviewScore', 'price', 'address', 'lat', 
      'lng', 'customerType')
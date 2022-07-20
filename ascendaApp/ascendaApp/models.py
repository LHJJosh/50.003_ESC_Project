from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

class Hotel(models.Model):

  class CustomerType(models.TextChoices):
    BUSINESS = 'B', _('Business')
    FAMILIES = 'F', _('Families')
    COUPLES = 'C', _('Couples')
    SINGLES = 'S', _('Singles')
  
  def reviewCountDefault():
    return {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}

  name = models.CharField(max_length=256, blank=True, default='')
  reviewScore = models.DecimalField(decimal_places=5, max_digits=6, blank=True)
  price = models.DecimalField(decimal_places=2, max_digits=8, blank=True)
  customerType = models.CharField(choices=CustomerType.choices, default=CustomerType.SINGLES, max_length=2, blank=True)

  address = models.CharField(max_length=256, blank=True)
  lat = models.DecimalField(decimal_places=5, max_digits=8, blank=True)
  lng = models.DecimalField(decimal_places=5, max_digits=8, blank=True)

  reviewCount = models.JSONField(default=reviewCountDefault, blank=True)
  dateCreated = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name

  class Meta:
    ordering = ['dateCreated']

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

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
  destination = models.CharField(max_length=256, blank=True, default='')
  reviewScore = models.DecimalField(decimal_places=5, max_digits=6, blank=True)
  rooms = models.IntegerField(default=0)
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
  destination = serializers.CharField(required=False, allow_blank=True, max_length=256)
  rooms = serializers.IntegerField(default=0)
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
    instance.destination = validated_data.get('destination', instance.destination)
    instance.rooms = validated_data.get('rooms', instance.destination)
    instance.reviewScore = validated_data.get('reviewScore', instance.reviewScore)
    instance.price = validated_data.get('price', instance.price)
    instance.customerType = validated_data.get('customerType', instance.customerType)
    instance.address = validated_data.get('address', instance.name)
    instance.lat = validated_data.get('lat', instance.lat)
    instance.lng = validated_data.get('lng', instance.lng)
    instance.save()
    return instance


class BookingInfo(models.Model):
  title = models.CharField(max_length=256, blank=True, default='')
  firstName = models.CharField(max_length=256, blank=True, default='')
  lastName = models.CharField(max_length=256, blank=True, default='')
  countryCode = models.CharField(max_length=256, blank=True, default='')
  phoneNumber = models.CharField(max_length=256, blank=True, default='')
  emailAddress = models.CharField(max_length=256, blank=True, default='')
  specialRequest = models.CharField(max_length=256, blank=True, default='')
  cardNumber = models.CharField(max_length=256, blank=True, default='')
  nameOnCard = models.CharField(max_length=256, blank=True, default='')
  expiryDate = models.DateField()
  cvvCvc = models.CharField(max_length=256, blank=True, default='')
  address = models.CharField(max_length=256, blank=True, default='')
  city = models.CharField(max_length=256, blank=True, default='')
  zipCode = models.CharField(max_length=256, blank=True, default='')
  country = models.CharField(max_length=256, blank=True, default='')

  def _str_(self):
        return self.title

class BookingsSerializer(serializers.Serializer):
  title = serializers.CharField(required=False, allow_blank=True, max_length=256)
  firstName = serializers.CharField(required=False, allow_blank=True, max_length=256)
  lastName = serializers.CharField(required=False, allow_blank=True, max_length=256)
  countryCode = serializers.CharField(required=False, allow_blank=True, max_length=256)
  phoneNumber = serializers.CharField(required=False, allow_blank=True, max_length=256)
  emailAddress = serializers.CharField(required=False, allow_blank=True, max_length=256)
  specialRequest = serializers.CharField(required=False, allow_blank=True, max_length=256)
  cardNumber = serializers.CharField(required=False, allow_blank=True, max_length=256)
  nameOnCard = serializers.CharField(required=False, allow_blank=True, max_length=256)
  expiryDate = serializers.DateField(required=False)
  cvvCvc = serializers.CharField(required=False, allow_blank=True, max_length=256)
  address = serializers.CharField(required=False, allow_blank=True, max_length=256)
  city = serializers.CharField(required=False, allow_blank=True, max_length=256)
  zipCode = serializers.CharField(required=False, allow_blank=True, max_length=256)
  country = serializers.CharField(required=False, allow_blank=True, max_length=256) 

  def create(self, validated_data):
    return BookingInfo.objects.create(**validated_data)
  
  def update(self, instance, validated_data):
    instance.title = validated_data.get('title', instance.title)
    instance.firstName = validated_data.get('firstName', instance.firstName)
    instance.lastName = validated_data.get('lastName', instance.lastName)
    instance.countryCode = validated_data.get('countryCode', instance.countryCode)
    instance.phoneNumber = validated_data.get('phoneNumber', instance.phoneNumber)
    instance.emailAddress = validated_data.get('emailAddress', instance.emailAddress)
    instance.specialRequest = validated_data.get('specialRequest', instance.specialRequest)
    instance.cardNumber = validated_data.get('cardNumber', instance.cardNumber)
    instance.nameOnCard = validated_data.get('nameOnCard', instance.nameOnCard)
    instance.expiryDate = validated_data.get('expiryDate', instance.expiryDate)
    instance.cvvCvc = validated_data.get('cvvCvc', instance.cvvCvc)
    instance.address = validated_data.get('address', instance.address)
    instance.city = validated_data.get('city', instance.city)
    instance.zipCode = validated_data.get('zipCode', instance.zipCode)
    instance.country = validated_data.get('country', instance.country)
    instance.save()
    return instance

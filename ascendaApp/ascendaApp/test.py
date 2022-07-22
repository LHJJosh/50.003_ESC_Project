from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Hotel
from .views import list_hotels, detail_hotel

class HotelTests(APITestCase):
  def setUp(self):
    Hotel.objects.create(name="name1",
                         destination="dest1",
                         reviewScore=3,
                         rooms=1,
                         price=100,
                         customerType=Hotel.CustomerType.BUSINESS,
                         lat=1.35123,
                         lng=103.123)
    Hotel.objects.create(name="name2",
                         destination="dest1",
                         reviewScore=3,
                         rooms=2,
                         price=150,
                         customerType=Hotel.CustomerType.SINGLES,
                         lat=1.35123,
                         lng=103.123)
    Hotel.objects.create(name="name3",
                         destination="dest1",
                         reviewScore=4,
                         rooms=1,
                         price=100,
                         customerType=Hotel.CustomerType.SINGLES,
                         lat=1.35123,
                         lng=103.123)
    Hotel.objects.create(name="name4",
                         destination="dest2",
                         reviewScore=2,
                         rooms=2,
                         price=150,
                         customerType=Hotel.CustomerType.BUSINESS,
                         lat=1.35123,
                         lng=103.123)
    Hotel.objects.create(name="name5",
                         destination="dest2",
                         reviewScore=4,
                         rooms=3,
                         price=200,
                         customerType=Hotel.CustomerType.SINGLES,
                         lat=1.35123,
                         lng=103.123)

  def test_destination_filter(self):
    url = reverse(list_hotels)
    data = {'destination': 'dest1'}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(i['destination'], 'dest1')
  
  def test_customertype_filter(self):
    url = reverse(list_hotels)
    data = {'customerType': Hotel.CustomerType.BUSINESS}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(i['customerType'], Hotel.CustomerType.BUSINESS)

  def test_room_filter(self):
    url = reverse(list_hotels)
    data = {'rooms': 2}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(float(i['rooms']) >= 2, True)
  
  def test_price_filter(self):
    url = reverse(list_hotels)
    data = {'price': 150}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(float(i['price']) <= 150, True)
  
  def test_reviewscore_filter(self):
    url = reverse(list_hotels)
    data = {'reviewScore': 3.0}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(float(i['reviewScore']) >= 3.0, True)
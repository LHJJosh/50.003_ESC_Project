import django
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import RequestsClient
from .models import Hotel, BookingInfo
from .views import list_hotels_internal, detail_hotel_internal, bookings

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
    url = reverse(list_hotels_internal)
    data = {'destination': 'dest1'}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(i['destination'], 'dest1')
  
  def test_customertype_filter(self):
    url = reverse(list_hotels_internal)
    data = {'customerType': Hotel.CustomerType.BUSINESS}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(i['customerType'], Hotel.CustomerType.BUSINESS)

  def test_room_filter(self):
    url = reverse(list_hotels_internal)
    data = {'rooms': 2}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(float(i['rooms']) >= 2, True)
  
  def test_price_filter(self):
    url = reverse(list_hotels_internal)
    data = {'price': 150}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(float(i['price']) <= 150, True)
  
  def test_reviewscore_filter(self):
    url = reverse(list_hotels_internal)
    data = {'reviewScore': 3.0}
    response = self.client.get(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    for i in response.data:
      self.assertEqual(float(i['reviewScore']) >= 3.0, True)
  
  def test_getdetails1(self):
    url = reverse(detail_hotel_internal, args=(1,))
    response = self.client.get(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['id'], 1)
    self.assertEqual(response.data['name'], 'name1')

  def test_getdetails2(self):
    url = reverse(detail_hotel_internal, args=(4,))
    response = self.client.get(url, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['id'], 4)
    self.assertEqual(response.data['name'], 'name4')

# class BookingTests(APITestCase):
#   def setUp(self):
#     BookingInfo.objects.create(title = 'Mr.', 
#                               firstName = 'Bruce',
#                               lastName = 'Wayne',
#                               countryCode = '20',
#                               phoneNumber = '90714829',
#                               emailAddress = 'batman@yahoo.com',
#                               specialRequest = 'batmobile',
#                               cardNumber = '234567899',
#                               nameOnCard = 'Bruce Wayne',
#                               expiryDate = django.utils.timezone.now,
#                               cvvCvc = '234',
#                               address = 'Wayne Manor',
#                               city = 'Gotham City',
#                               zipCode = '123456',
#                               country = 'U.S.')

#   def test_post_req(self):
#     client = RequestsClient()
#     url = reverse(bookings)
#     data = {'title': "Mr.",
#             'firstName': "Bruce",
#             'lastName': "Wayne",
#             'countryCode': "20",
#             'phoneNumber': "90714829",
#             'emailAddress': "batman@yahoo.com",
#             'specialRequest': "batmobile",
#             'cardNumber': "234567899",
#             'nameOnCard': "Bruce Wayne",
#             'expiryDate': now.strftime("%m/%d/%Y"),
#             'cvvCvc': "234",
#             'address': "Wayne Manor",
#             'city': "Gotham City",
#             'zipCode': "123456",
#             'country': "U.S."
#     }
#     response = self.client.post(url, data, format='json')
#     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#     self.assertEqual(response.json, data)
from django.db import models


class Hotel(models.Model):
  name = models.CharField(max_length=256)
  reviewScore = models.DecimalField(decimal_places=5, max_digits=6)
  price = models.DecimalField(decimal_places=2, max_digits=8)

  address = models.CharField(max_length=256)
  lat = models.DecimalField(decimal_places=5, max_digits=8)
  lng = models.DecimalField(decimal_places=5, max_digits=8)

  customerType = models.CharField(max_length=64) # business, families, couples, singles

  def __str__(self):
    return self.name

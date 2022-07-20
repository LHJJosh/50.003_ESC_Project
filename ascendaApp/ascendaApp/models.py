from django.db import models
from django.utils.translation import gettext_lazy as _

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

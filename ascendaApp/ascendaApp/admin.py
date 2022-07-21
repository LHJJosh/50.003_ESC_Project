from django.contrib import admin

from .models import Hotel
from .models import BookingInfo

#class HotelAdmin(admin.ModelAdmin):
#    list_display = ('title', 'description', 'completed')

admin.site.register(Hotel)
admin.site.register(BookingInfo)
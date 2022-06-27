from django.contrib import admin

from .models import Hotel

#class HotelAdmin(admin.ModelAdmin):
#    list_display = ('title', 'description', 'completed')

admin.site.register(Hotel)
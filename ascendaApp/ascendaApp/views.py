from django.shortcuts import render

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Create your views here.
def index(request):
    print(BASE_DIR)
    return render(request, BASE_DIR / 'build/index.html')


def booking(request):
    return render(request, BASE_DIR / 'build/booking.html')



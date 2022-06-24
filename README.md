# 50.003_ESC_Project

## Project creation
Refer to this guide to setup: https://alphacoder.xyz/dead-simple-react-django-setup/
```
# Django setup
pip install django
django-admin startproject ascendaDjango
django-admin startapp ascendaApp
# add ascendaApp to INSTALLED_APPS in ascendaApp/ascendaApp/settings.py
# add react directory to urlpatterns in ascendaApp/ascendaApp/url.py

# React setup
npm install -g create-react-app
create-react-app ascenda-app
mv ascenda-app/*
```

## Environment setup
Create your conda environment or python venv and run the following in it. 
If unsure, refer to https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/.
```
python -m pip install -U --force-reinstall -r requirements.txt  # use pip3 for Linux
npm install
```

## Run app
```
cd ascendaApp/
python manage.py runserver # django
npm start                  # react
```

## Deploy locally
```
cd ascendaApp/
npm run build               # react frontend
python manage.py runserver  # start django server
```

## Change database models
```
python manage.py makemigrations ascendaApp  # update migrations from Django models
python manage.py sqlmigrate ascendaApp 0001 # returns SQL from migrations
python manage.py migrate                    # apply migrations

python manage.py createsuperuser            # create admin
# Visit http://127.0.0.1:8000/admin/
# Visit http://127.0.0.1:8000/api/
# Visit http://127.0.0.1:8000/api/getHotelView/7/ to update / delete for id 7
```

## Experiment with django shell
```
python manage.py shell # run cli with django project environment

from ascendaApp.models import Hotel
from django.utils import timezone

Hotel.objects.all().count()
Hotel.objects.filter(id=1).get()
Hotel.objects.filter(name__startswith='Park').get() # __ to chain relationships, question__dat__year
Hotel.objects.get(pk=1).delete()

h1 = Hotel(name='Studio M Hotel', reviewScore=3.69, price=450.0, address='3 Nanson Road', lat=1.29088, lng=103.83904)
h1.save()
h2 = Hotel(name='Park Hotel Clarke Quay', reviewScore=2.69, price=302.0, address='1 Unity Street', lat=1.29148, lng=103.8424)
h2.save()
h3 = Hotel(name='Aqueen Hotel Paya Lebar', reviewScore=4.69, price=192.0, address='33 Jalan Afifi', lat=1.32218, lng=103.89177)
h3.save()
```

## Project structure
```
└───ascendaApp:
    ├───ascendaApp      django project
    ├───hotelSearch     django app
        ├───settings.py   configure django project
        ├───urls.py       url declarations, i.e. table of contents
        ├───asgi.py       entry point for asgi web servers
        ├───wsgi.py       entry point for wsgi web servers
        └───...
    ├───public          public assets
        ├───index.html    page template
        └───...
    ├───src             js and css here
        ├───index.js      entry point
        └───...
    ├───manage.py       
    └───...
```
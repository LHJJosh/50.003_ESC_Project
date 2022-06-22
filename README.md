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
npm start
```

## Project structure
```
└───ascendaApp:         main app
    ├───ascendaApp      django project
    ├───hotelSearch     django app
    ├───public          public assets
    ├───src             
    ├───manage.py       
    └───...
```
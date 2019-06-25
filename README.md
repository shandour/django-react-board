A simple app emulating interactions between a separated SPA-frontend and Django-REST backend.

At least the following two envvars are needed to run the backend: DATABASE_URL and SECRET_KEY.

To run the app:
  pip install -r requirements.txt
  cd react-app
  yarn install
  
  run 2 devservers in 2 separate consoles:
  python manage.py runserver
  yarn start

  Enjoy! ;)


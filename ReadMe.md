This is a simple web shop web site where an owner can add,update,delete stocks 
User is able to view the stocks and add to cart the needed stocks and place order.

How to run:

cd frontend
npm i
npm start

cd backend
create a .env file

PORT=5000
HOST=localhost
DB=webshop
DB_USER=username
DB_PASSWORD=password
DB_PORT=3306
DB_DIALECT=mysql

input the following parameters to the .env file.

npm i 
npm run dev


In MySQL:

CREATE DATABASE webshop;

The tables will be automatically created through the ORM if not exist.

ENJOY!
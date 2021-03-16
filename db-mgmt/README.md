# smart-curbs-api
Make sure you installed already *nodejs*, *postgresql* and *postgresql-contrib*.

Change the variables into *connect.sh* in order to match your db details, then run: 
`$ ./connect.sh`
to connect to the aws pg instance and create a database, named **smartcurbs**:
`CREATE DATABASE smartcurbs;`
then type:
`exit`

Now install the dependencies with:
`$ npm i` or `$ yarn` 
and with the same variables into your *.env* file run:
`$ node regenerateTable.js`
that will drop the table if existent and regenerate it, with the desired schema.


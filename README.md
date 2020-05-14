# Javascript Command Line Interface 

This is a simple command line interface (CLI), written in Javascript, which persists data using a JSON file.
It is simple movie booking system.
User can 
- view the movies from the database.
- check the ticket prices.
- book the ticket
    - user can choose the showtime
    - select the number of tickets to purchase
    - select the seat

Upon sucessful booking (after saving in the database), user can have a confirmation message.


## Run the demo

Run `npm install` then `npm start` to try the CLI.
Run `node app.js`

## How it works

`app.js` loads up an API library which is used to read and write the JSON file `lib/db.json`.

The CLI is displayed to the user using lots of `console.log`s.

It uses a library called `readline-sync` to request user input.



### 3: Edit the API data

Open `lib/db.json` and update the file to use an appropriate data structure for the app.




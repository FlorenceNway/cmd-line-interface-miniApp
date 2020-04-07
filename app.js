const API = require("./lib/API");
const readlineSync = require("readline-sync");
const chalk = require('chalk');
const movies = API.read("movies");

let selectedItems = {
	movie: "",
	time: "",
    number: "",
    seat: ""
};

//-------------- Movie Summary --------------------
const displayMoviesSummary = (movies) => {
  for (const movie of movies) {
      console.log(
        `--- ${movie.id}: ${movie.title}, - duration: ${movie.duration}mins`
      );
    } 
    selectMovie()
}

const selectMovie = () => {
    console.log("----------------");
    const choice = readlineSync.question("What movie whould you like to watch? - ");
	
	if(choice === 4) {
		mainMenu()
	} else {
		showDetails(choice)
	}
}

const showDetails = (index) => {
    const id = index - 1;

  
    console.log(
        chalk.red(`---Name: ${movies[id].title}, Genre: ${movies[id].genre} ---`)
    );
    console.log(`1. Choose showtime`)
    console.log(`2. Select Seating`)
    console.log(`3. Select number of tickets`)
    console.log(`3. See plot preview`)
    console.log(`4. Go Back to Main Menu`)
    console.log("----------------");

    const choice = readlineSync.question("Please choose an option: ");

    switch (choice) {
        case '1':
          showtime(id);
          break;
        case '2':
          seating(id);
          break;
        case '3':
          tickets(id);
          break;
        case '4':
          storyPreview(id);
          break;
      }
    
}
//============================================================

const showtime = (id) => {
    const showtimes = movies[id].times;
    let i = 1;
    console.log(chalk.blue(`--- showtime ----`));

    for (const time of showtimes) {
        console.log( `${i} - ${time}`);
        i++;
    } 
    
    const choice = readlineSync.question("Please choose an option: ");
}

const tickets = () => {
    const numbers = [1,2,3,4,5]
    console.log('.....Maximum number of tickets can be purchased: 5 ........')
    const choice = readlineSync.question("How many tickets do you want to buy? ");
    if(choice <= 5 ) {
        selectedItems.number = choice
    }else {
        console.log('Tickets exceed the maximum number of allowance')
        const choice = readlineSync.question("How many tickets do you want to buy? ");
    }
}

const seating = (id) => {
    const seats = movies[id].seating['seats']
    let i = 1;
    console.log(chalk.blue(`--- Available Seatings ----`));

    for (const seat of seats) {
        console.log(`${i} - ${seat}`)
        i++;
    } 
    
    const choice = readlineSync.question("Please choose the seat: ");  
}

const storyPreview = (id) => {
    console.log(`Plot : ${movies[id].plot}`)

}



function mainMenu() {
  console.log("----------------");
  console.log("---- Movies Booking System----");
  console.log("----------------");
  console.log("1. View all our movies");
  console.log("2. Check showtime");
  console.log("3. Ticket Price");
  console.log("4. Rate our service");
  console.log("----------------");

  const choice = readlineSync.question("Please choose an option ");

  if (choice === "1") {
    console.log("-----------------");
    console.log(chalk.yellow("- ALL OUR MOVIES -"));
    console.log("-----------------");

    // get all movies
    displayMoviesSummary(movies);

    // return to main menu
    mainMenu();
    } 
}
mainMenu();

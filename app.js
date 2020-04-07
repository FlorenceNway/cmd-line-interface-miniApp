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

//======================== Main Menu Choice 1 ============================================

//-------------- Movie Summary --------------------
const displayMoviesSummary = () => {
  for (const movie of movies) {
      console.log(
        `--- ${movie.id}: ${movie.title}, - duration: ${movie.duration}mins`
      );
    } 
    mainMenu()
}

const toBook = () => {
    displayMoviesSummary()
    selectMovie()
}

const selectMovie = () => {
    console.log("----------------");
    const choice = readlineSync.question("What movie whould you like to watch? - ");
	
	if(choice == -1) {
		mainMenu()
	} else {
		showDetails(choice)
    }
    return choice;
}

const showDetails = (index) => {
    const id = index - 1;
  
    console.log(
        chalk.red(`---Name: ${movies[id].title}, Genre: ${movies[id].genre} ---`)
    );
    console.log(`1. Choose showtime`)
    console.log(`2. Select Seating`)
    console.log(`3. Select number of tickets`)
    console.log(`4. See plot preview`)
    console.log(`5. Go Back to Main Menu`)
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
        default:
          mainMenu();
          break;
      }
}
    //====================== Show Details ============//

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

//=============== Main Menu =========================
function mainMenu() {
  console.log("-------------------------------");
  console.log("---- Movies Booking System----");
  console.log("-------------------------------");
  console.log("1. View all our movies");
  console.log("2. Ticket Price");
  console.log("3. To book the ticket");
  console.log("4. Rate our service");
  console.log("===============================");

  const choice = readlineSync.question("Please choose an option ");

  if (choice === "1") {
    console.log("----------------------------------");
    console.log(chalk.yellow("-- ALL OUR MOVIES --"));
    console.log("----------------------------------");
    // Show all movies
    displayMoviesSummary(movies);

  }else if (choice === '2') {
    chooseMovieTypes()
    mainMenu();

  }else if (choice == '3') {
      toBook()
      
  }else if (choice == '4') {
    rateOurService()
  }

}

//===================== Menu Number 2 ==============================
const chooseMovieTypes = () => {
    const movieTypes = movies[0]['Price']
    
    const types = ['2D', '3D']
    const choice = readlineSync.keyInSelect(types,`Pick a type of movie you want to watch ?`,{cancel: 'Go to main menu'})

    if( choice == -1) {
        console.log(chalk.red('Choose from option!!'))
        const choice = readlineSync.keyInSelect(types,`Pick a type of movie you want to watch ?`,{cancel: 'Go to main menu'})
    }
    else if(choice == 0){
        console.log("----------------------------------");
        console.log(chalk.yellow("-- Ticket Price for 2D are : --"));
        console.log("----------------------------------");
        console.log(`Adult Price: £${movieTypes[0]['2D'].Adult}`)
        console.log(`Child Price: £${movieTypes[0]['2D'].Child}`)
    }
    else if(choice == 1){
        console.log("----------------------------------");
        console.log(chalk.yellow("-- Ticket Price for 3D are : --"));
        console.log("----------------------------------");
        console.log(`Adult Price: £${movieTypes[1]['3D']['Adult']}`)
        console.log(`Child Price: £${movieTypes[1]['3D']['Child']}`)
    }
}

//===================== Menu Number 3 ==============================

const rateOurService = () => {
    if(!API.read('ratings')) {
        API.create('ratings',{})
    }
    console.log("----------------------------------");
    console.log(chalk.yellow("-- Rate our service from 1 to 10 --"));
    console.log("----------------------------------");
    const rating = readlineSync.question("How do you want to rate our service? - ");

    const ratings = API.read('ratings')
    ratings.push({'rate': rating})
    
    API.update(ratings)
}

mainMenu();

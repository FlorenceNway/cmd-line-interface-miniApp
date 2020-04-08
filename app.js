const API = require("./lib/API");
const readlineSync = require("readline-sync");
const chalk = require("chalk");
const movies = API.read("movies");

let selectedItems = {
  movie: "",
  time: "",
  number: "",
  seat: [],
};

//======================== Main Menu Choice 1 ============================================

//-------------- Movie Summary --------------------
const displayMoviesSummary = () => {
  for (const movie of movies) {
    console.log(
      `--- ${movie.id}: ${movie.title}, - duration: ${movie.duration}mins`
    );
  }
};

const toBook = () => {
  displayMoviesSummary();
  selectMovie();
};

const selectMovie = () => {
  console.log("----------------");
  const choice = readlineSync.question(
    "What movie whould you like to watch? - "
  );

  if (choice == -1) {
    mainMenu();
  } else {
    selectedItems.movie = movies[parseInt(choice) - 1].title;
    console.log(choice, typeof choice);
    showDetails(choice);
  }
  return choice;
};

const showDetails = (id) => {
  const index = parseInt(id);

  console.log(
    chalk.red(
      `---Name: ${movies[index - 1].title}, Genre: ${movies[index].genre} ---`
    )
  );
  console.log(`1. Choose showtime`);
  console.log(`2. Select number of tickets`);
  console.log(`3. See plot preview`);
  console.log(`4. Go Back to Main Menu`);
  console.log("----------------");

  const choice = readlineSync.question("Please choose an option: ");

  switch (choice) {
    case "1":
      showtime(index);
      break;
    case "2":
      tickets(index);
      break;
    case "3":
      storyPreview(index);
      break;
    case "4":
      mainMenu();
      break;
    default:
      mainMenu();
      break;
  }
};
//====================== Show Details ============//

const showtime = (index) => {
  const showtimes = movies[index - 1].times;
  let i = 1;
  console.log(chalk.blue(`--- showtime ----`));

  for (const time of showtimes) {
    console.log(`${i} - ${time}`);
    i++;
  }

  const choice = readlineSync.question("Please choose the time: ");

  selectedItems["time"] = showtimes[parseInt(choice) - 1];
  console.log(chalk.green(`You chose the time ${selectedItems.time}`));

  if (!choice || choice === -1 || parseInt(choice) > 5) {
    console.log(chalk.red("Choose from the options!"));
    const choice = parseInt(readlineSync.question("Please choose the time: "));
  }

  if (!selectedItems.number) {
    tickets(index);
  }
  if (!selectedItems.seat.length) {
    seating(index);
  }
};

const tickets = (index) => {
  console.log(chalk.yellow("----- Ticketing -----"));
  console.log(".....Maximum number of tickets can be purchased: 5 ........");
  const choice = readlineSync.question("How many tickets do you want to buy? ");
  if (parseInt(choice) <= 5) {
    selectedItems.number = choice;
  } else {
    console.log("Tickets exceed the maximum number of allowance");
    const choice = readlineSync.question(
      "How many tickets do you want to buy? "
    );
  }
  console.log(
    chalk.green(`You chose ${selectedItems.number} tickets to purchase.`)
  );

  if (!selectedItems.time) {
    showtime(index);
  }
  if (!selectedItems.seat.length) {
    seating(index);
  }
};

const seating = (index) => {
  const seats = movies[index - 1].seating["seats"];
  let i = 1;
  console.log(chalk.blue(`--- Available Seatings ----`));

  for (const seat of seats) {
    console.log(`${i} - ${seat}`);
    i++;
  }

  console.log(`you need to choose seats for ${selectedItems.number} tickets`);

  for (let i = 0; i < selectedItems.number; i++) {
    const choice = parseInt(readlineSync.question(`Please choose the seat : `));
    if (choice == -1 || choice) {
      console.log(chalk.red("Choose from the options!"));
      const choice = parseInt(readlineSync.question("Please choose seat: "));
    }
    selectedItems["seat"].push(seats[choice - 1]);
  }
  console.log(chalk.green(`You chose seat number: ${selectedItems.seat}`));

  displayBookingDetails();
  confirmBooking(index);
};

const storyPreview = (index) => {
  console.log(`Plot : ${movies[index - 1].plot}`);
  showDetails(index);
};

const displayBookingDetails = () => {
  console.log(chalk.yellow("---- Your booking details are: ----"));
  console.log(chalk.green(`${selectedItems.movie}`));
  console.log(chalk.green(`Seat number: ${selectedItems.seat}`));
  console.log(chalk.green(`No. of tickets: ${selectedItems.number} `));
  console.log(chalk.green(`For the time slot: ${selectedItems.time}`));
};

const confirmBooking = (index) => {
  if (readlineSync.keyInYN("Do you want to confirm your booking?")) {
    console.log(chalk.cyanBright("Your booking is confirmed!"));
    rateOurService();
    addToSold(index);
  } else {
    setTimeout(function () {
      console.log(chalk.red("You have been redirected to Main menu!"));
      mainMenu();
    }, 2000);
  }
};

//=============== Main Menu =========================
function mainMenu() {
  console.log("-------------------------------");
  console.log(chalk.green("---- Movies Booking System ----"));
  console.log(
    chalk.blue(
      "------- Choose an option below for what you want to do ------------"
    )
  );
  console.log("1. View all our movies list");
  console.log("2. Ticket Price");
  console.log("3. To book the ticket");
  console.log("4. Rate our service");
  console.log("===============================");

  const choice = readlineSync.question("Please choose an option ");

  if (choice === "1") {
    console.log("----------------------------------");
    console.log(chalk.yellow("-- ALL OUR MOVIES LIST --"));
    console.log("----------------------------------");
    // Show all movies
    displayMoviesSummary(movies);
    mainMenu();
  } else if (choice === "2") {
    checkTicketPrice();
    mainMenu();
  } else if (choice == "3") {
    toBook();
  } else if (choice == "4") {
    rateOurService();
  }
}

//===================== Menu Number 2 ==============================
const checkTicketPrice = () => {
  const movieTypes = movies[0]["Price"];

  const types = ["2D", "3D"];
  const choice = readlineSync.keyInSelect(
    types,
    `Pick a type of movie you want to watch ?`,
    { cancel: "Go to main menu" }
  );

  if (choice == 2) {
    mainMenu();
  }
  // else if(choice == -1) {
  //     console.log(chalk.red('Choose from option!!'))
  //     const choice = readlineSync.keyInSelect(types,`Pick a type of movie you want to watch ?`,{cancel: 'Go to main menu'})
  // }
  else if (choice == 0) {
    console.log("----------------------------------");
    console.log(chalk.yellow("-- Ticket Price for 2D are : --"));
    console.log("----------------------------------");
    console.log(`Adult Price: £${movieTypes[0]["2D"].Adult}`);
    console.log(`Child Price: £${movieTypes[0]["2D"].Child}`);
  } else if (choice == 1) {
    console.log("----------------------------------");
    3;
    console.log(chalk.yellow("-- Ticket Price for 3D are : --"));
    console.log("----------------------------------");
    console.log(`Adult Price: £${movieTypes[0]["3D"].Adult}`);
    console.log(`Child Price: £${movieTypes[0]["3D"].Child}`);
  }
  // else {
  //     console.log(chalk.red('Choose from option!!'))
  //     const choice = readlineSync.keyInSelect(types,`Pick a type of movie you want to watch ?`,{cancel: 'Go to main menu'})
  // }
};

//===================== Menu Number 3 ==============================

const rateOurService = () => {
  console.log("----------------------------------");
  console.log(chalk.yellow("-- Rate our service from 1 to 10 --"));
  console.log("----------------------------------");
  const rating = readlineSync.question(
    "How do you want to rate our service? - "
  );
  const name = readlineSync.question("Please type your name? - ");

  const rates = API.read("Ratings");
  const UserRating = { rate: "", name: "" };
  UserRating.rate = rating;
  UserRating.name = name;
  API.create("Ratings", UserRating);

  if (!rates) {
    API.update("Ratings", 1);
  } else {
    rates.push(UserRating);
    API.update("Ratings", rates.id - 1);
  }

  console.log(chalk.magenta("Thanks for using our service!"));
};

movies["ticketsSold"] = [];
const addToSold = (index) => {
  const movie = API.read("movies", index);
  movie["ticketsSold"].push(selectedItems);
  API.update("movies", movie);

  removeSeatAfterSold(index);
};

const removeSeatAfterSold = (index) => {
  const movie = API.read("movies", index);

  selectedItems.seat.forEach((Occupiedseat) => {
    const availableSeats = movie["seating"]["seats"];
    
    if (availableSeats.includes(Occupiedseat)) {
      const idex = availableSeats.indexOf(Occupiedseat);
      if (idex > -1) {
        availableSeats.splice(idex, 1);
      }
    }
  });
  API.update("movies", movie);
};

mainMenu();

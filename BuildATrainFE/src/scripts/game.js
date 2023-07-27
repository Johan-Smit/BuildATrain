const apiHost = 'http://localhost:5023';

const locomotiveTypes = {
  Small: 1,
  Medium: 2,
  Large: 3
}

const carTypes = {
  Passenger: 4,
  Cargo: 5, 
  Fuel: 6
}

let game;

let trainName;

let token;

let email;

function selectTrain(){
  trainName = document.getElementById('train-select').selectedOptions[0].innerText;
  updateTrain(game.gameModel.trains.find((train) => { train.locomotiveName === trainName}));
}

async function loadGame(){
  token = getCookie('oauth_token');
  email = getCookie('email');
  try {
    const response = await fetch(`${apiHost}/game/load`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      queryParams: {
        'email': email
      }
    });

    if (response?.ok) {

      game = await response.json();

      const trainList = document.getElementById('train-select');

      if (game.gameModel.trains) {

        game.gameModel.trains.map((train) => {
          const option = document.createElement('option');
          option.textContent = train.locomotiveName;
          trainList.appendChild(option);
        });

      
        updateTrain(game.gameModel.trains[0]);
      }

    }

  }
  catch(error) {
    console.error(error);
  }
};

async function purchasePassenger(){
  try{

    const response = await fetch(`${apiHost}/game/add/car`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Passenger
      }
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.gameModel.trains.findIndex((train) => {train.locomotiveName === myJSON.newTrainModel.locomotiveName});
      if (index !== -1) {
        game.gameModel.trains[index] = myJSON.newTrainModel;
        updateTrain(game.gameModel.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function purchaseCargo(){
  try{

    const response = await fetch(`${apiHost}/game/add/car`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Cargo
      }
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.gameModel.trains.findIndex((train) => {train.locomotiveName === myJSON.newTrainModel.locomotiveName});
      if (index !== -1) {
        game.gameModel.trains[index] = myJSON.newTrainModel;
        updateTrain(game.gameModel.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function purchaseFuel(){
  try{
    const response = await fetch(`${apiHost}/game/add/car`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Fuel
      }
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.gameModel.trains.findIndex((train) => {train.locomotiveName === myJSON.newTrainModel.locomotiveName});
      if (index !== -1) {
        game.gameModel.trains[index] = myJSON.newTrainModel;
        updateTrain(game.gameModel.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function purchaseTrain(){
  trainType = document.getElementById('train-type-select').selectedOptions[0].innerText;
  const locomotiveName = document.getElementById('locomotiveName').innerText;
  let locomotiveType;
  switch (trainType) {
    case 'Small':
      locomotiveType = locomotiveTypes.Small;
      break;

    case 'Medium':
      locomotiveType = locomotiveTypes.Medium;
      break;

    default:
      locomotiveType = locomotiveTypes.Large;
      break;
  }

  try{

    const response = await fetch(`${apiHost}/game/add/car`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': locomotiveName, 
        'locomotiveType': locomotiveType
      }
    });

    if (response?.ok) {
      const myJSON = await response.json();
      if (myJSON.newGameModel) {
        game.gameModel = myJSON.newGameModel;
      }
    }

    updateTrain(game.gameModel.trains.find((train) => train.locomotiveName === locomotiveName));

    const trainList = document.getElementById('train-select');
    trainList.options.length = 0;

    game.gameModel.trains.map((train) => {
      const option = document.createElement('option');
      option.textContent = train.locomotiveName;
      trainList.appendChild(option);
    });

  }
  catch(error) {
    console.error(error);
  }
};

async function deleteTrain(){
  try{

    const response = await fetch(`${apiHost}/remove/train`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName
      }
    });

    if (response?.ok) {
      const myJSON = await response.json();
      if (myJSON.newGameModel) {
        game.gameModel = myJSON.newGameModel;
      }
    }

    if (game.gameModel.trains) {
      updateTrain(game.gameModel.trains[0]);
    }

    const trainList = document.getElementById('train-select');
    trainList.options.length = 0;

    game.gameModel.trains.map((train) => {
      const option = document.createElement('option');
      option.textContent = train.locomotiveName;
      trainList.appendChild(option);
    });

  }
  catch(error) {
    console.error(error);
  }
};

async function deletePassenger(){
  try{

    const response = await fetch(`${apiHost}/remove/car`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Passenger
      }
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.gameModel.trains.findIndex((train) => {train.locomotiveName === myJSON.newTrainModel.locomotiveName});
      if (index !== -1) {
        game.gameModel.trains[index] = myJSON.newTrainModel;
        updateTrain(game.gameModel.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function deleteCargo(){
  try{

    const response = await fetch(`${apiHost}/remove/car`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Cargo
      }
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.gameModel.trains.findIndex((train) => {train.locomotiveName === myJSON.newTrainModel.locomotiveName});
      if (index !== -1) {
        game.gameModel.trains[index] = myJSON.newTrainModel;
        updateTrain(game.gameModel.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function deleteFuel(){
  try{

    const response = await fetch(`${apiHost}/remove/car`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Fuel
      }
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.gameModel.trains.findIndex((train) => {train.locomotiveName === myJSON.newTrainModel.locomotiveName});
      if (index !== -1) {
        game.gameModel.trains[index] = myJSON.newTrainModel;
        updateTrain(game.gameModel.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

window.addEventListener('load',async () =>{
  loadGame();
});
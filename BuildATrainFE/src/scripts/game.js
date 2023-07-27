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

function updateTrainName(){
  trainName = document.getElementById('train-select').selectedOptions[0].innerText;
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
      game.trains.map((train) => {
        const option = document.createElement('option');
        option.textContent = train.locomotiveName;
        trainList.appendChild(option);
      });
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
  }
  catch(error) {
    console.error(error);
  }

  updateTrain({
    trainId: 0,
    locomotiveTypeId: locomotiveTypes.Large,
    locomotiveName: "Thomas",
    numPassengerCars: 5,
    numCargoCars: 0,
    numFuelCars: 5
  });
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
  }
  catch(error) {
    console.error(error);
  }

  updateTrain({
    trainId: 0,
    locomotiveTypeId: locomotiveTypes.Medium,
    locomotiveName: "Thomas",
    numPassengerCars: 0,
    numCargoCars: 1,
    numFuelCars: 0
  });
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
  }
  catch(error) {
    console.error(error);
  }
};

async function purchaseTrain(){
  trainType = document.getElementById('train-type-select').selectedOptions[0].innerText;
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
        'locomotiveName': trainName,
        'locomotiveType': locomotiveType
      }
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
    if (response.ok){
      const myJSON = await response.json();
    }
  }
  catch(error) {
    console.error(error);
  }
};

window.addEventListener('load',async () =>{
  loadGame();
});
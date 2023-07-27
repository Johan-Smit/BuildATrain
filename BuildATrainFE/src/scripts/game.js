const apiHost = 'http://localhost:5023';

const locomotiveTypes = {
  Small: 1,
  Medium: 2,
  Large: 3
}

const carTypes = {
  Passenger: 0,
  Cargo: 1,
  Fuel: 2
}

let game;

let trainName;

let token;

let user;

function updateTrainName(){
  trainName = document.getElementById('train-select').selectedOptions[0].innerText;
}

async function loadGame(){
  token = getCookie('oauth_token');
  user = getCookie('email');
  try {
    const response = await fetch(`${apiHost}/game/load`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      queryParams: {
        'username': user
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
    console.log(error);
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
        'username': '',
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
    numCargoCars: 5,
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
        'locomotiveName': trainName,
        'carType': carTypes.Cargo
      }
    });
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
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
  try{
    const response = await fetch(`${apiHost}/game/add/car`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
        'locomotiveName': trainName,
        'locomotiveType': 0
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
        'locomotiveName': trainName,
        'carType': carTypes.Fuel
      }
    });
  }
  catch(error) {
    console.error(error);
  }
};

window.addEventListener('load',async () =>{
  loadGame();
});
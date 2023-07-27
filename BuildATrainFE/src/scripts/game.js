const apiHost = 'http://localhost:5023';

const locomotiveTypes = {
  Small: 0,
  Medium: 1,
  Large: 2
}

const carTypes = {
  Passenger: 0,
  Cargo: 1, 
  Fuel: 2
}

let game;

let trainName;

function updateTrainName(){
  trainName = document.getElementById('train-select').selectedOptions[0].innerText;
}

async function loadGame(){
  try {
    const response = await fetch(`${apiHost}/game/load`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      queryParams: {
        'username': ''
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
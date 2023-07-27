const apiHost = 'https://mn2r2ze2wx.us-east-1.awsapprunner.com';

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

function sseUpdate(event) {
  console.log(event);
  const [ money, income ] = event.data.split('\n');
  console.log(money,income);
  document.getElementById('money-total').textContent = money ? money : 0;
  document.getElementById('income').textContent = income ? `${income} / 10s` : `0 / 10s`;
}

function subscribeToSSE() {
  const source = new EventSource(`${apiHost}/sse-events?email=${email}`);
  source.onopen = () => console.log('---Connection Established---');
  source.onerror = () => console.log('---Connection Failed---');

  source.onmessage = (event) => { sseUpdate(event) }; //Function for SSE updates here
}

function changeSelected(newTrainName) {
  const trainList = document.getElementById('train-select');
  const options = Array.from(trainList.options);
  const optionToSelect = options.find(item => item.text === newTrainName);
  optionToSelect.selected = true;
};

function selectTrain(){
  trainName = document.getElementById('train-select').selectedOptions[0].innerText;
  let x;
  
  for (let i=0; i<game.trains.length; i++) {
    if (game.trains[i].locomotiveName == trainName) {
      x = game.trains[i];
      break;
    }
  }

  console.log(x);

  updateTrain(x);
}

async function loadGame(){
  token = getCookie('oauth_token');
  email = getCookie('email');
  try {
    const response = await fetch(`${apiHost}/game/load?Email=${email}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response?.ok) {

      subscribeToSSE();

      game = await response.json();

      trainName = game.trains[0].locomotiveName

      const trainList = document.getElementById('train-select');

      if (game.trains.length > 0) {

        game.trains.map((train) => {
          const option = document.createElement('option');
          option.textContent = train.locomotiveName;
          trainList.appendChild(option);
        });

      
        updateTrain(game.trains[0]);
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
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Passenger
      })
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.trains.findIndex((train) => {train.locomotiveName === myJSON.locomotiveName});
      if (index !== -1) {
        game.trains[index] = myJSON;
        updateTrain(game.trains[index]);
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
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Cargo
      })
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.trains.findIndex((train) => {train.locomotiveName === myJSON.locomotiveName});
      if (index !== -1) {
        game.trains[index] = myJSON;
        updateTrain(game.trains[index]);
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
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Fuel
      })
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.trains.findIndex((train) => {train.locomotiveName === myJSON.locomotiveName});
      if (index !== -1) {
        game.trains[index] = myJSON;
        updateTrain(game.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function purchaseTrain(){
  trainType = document.getElementById('train-type-select').selectedOptions[0].innerText;
  const locomotiveName = document.getElementById('locomotiveName').value;
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

    console.log(email, locomotiveName, locomotiveType);
    const response = await fetch(`${apiHost}/game/add/train`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'email': email,
        'locomotiveName': locomotiveName, 
        'locomotiveType': locomotiveType
      })
    });

    if (response?.ok) {
      const myJSON = await response.json();
      if (myJSON.trains) {
        game.trains = myJSON.trains;
      }

      let x;
  
  for (let i=0; i<game.trains.length; i++) {
    if (game.trains[i].locomotiveName == trainName) {
      x = game.trains[i];
      break;
    }
  }

  console.log(x);

  updateTrain(x);
      changeSelected(locomotiveName);
    }

    let x;
  
  for (let i=0; i<game.trains.length; i++) {
    if (game.trains[i].locomotiveName == trainName) {
      x = game.trains[i];
      break;
    }
  }

  console.log(x);

  updateTrain(x);

    const trainList = document.getElementById('train-select');
    trainList.options.length = 0;

    game.trains.map((train) => {
      const option = document.createElement('option');
      option.textContent = train.locomotiveName;
      trainList.appendChild(option);
    });

    changeSelected(locomotiveName);

  }
  catch(error) {
    console.error(error);
  }
};

async function deleteTrain(){
  try{

    const response = await fetch(`${apiHost}/game/remove/train`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName
      })
    });

    if (response?.ok) {
      const myJSON = await response.json();
      game.trains = myJSON.trains;
    }

    const trainList = document.getElementById('train-select');
    trainList.options.length = 0;

    game.trains.map((train) => {
      const option = document.createElement('option');
      option.textContent = train.locomotiveName;
      trainList.appendChild(option);
    });

    if (game.trains.length > 0) {
      updateTrain(game.trains[0]);
      changeSelected(game.trains[0].locomotiveName);
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function deletePassenger(){
  try{

    const response = await fetch(`${apiHost}/game/remove/car`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Passenger
      })
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.trains.findIndex((train) => {train.locomotiveName === myJSON.locomotiveName});
      if (index !== -1) {
        game.trains[index] = myJSON;
        updateTrain(game.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function deleteCargo(){
  try{

    const response = await fetch(`${apiHost}/game/remove/car`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Cargo
      })
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.trains.findIndex((train) => {train.locomotiveName === myJSON.locomotiveName});
      if (index !== -1) {
        game.trains[index] = myJSON;
        updateTrain(game.trains[index]);
      }
    }

  }
  catch(error) {
    console.error(error);
  }
};

async function deleteFuel(){
  try{

    const response = await fetch(`${apiHost}/game/remove/car`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'email': email,
        'locomotiveName': trainName,
        'carType': carTypes.Fuel
      })
    });

    if (response?.ok){
      const myJSON = await response.json();
      const index = game.trains.findIndex((train) => {train.locomotiveName === myJSON.locomotiveName});
      if (index !== -1) {
        game.trains[index] = myJSON;
        updateTrain(game.trains[index]);
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
const apiHost = 'http://localhost:5023'

async function loadGame(){
  try {
    const response = await fetch(`http://localhost:5023/game/load`, {
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
      const game = await response.json();
      sessionStorage.setItem('trains', game);
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
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: {
        'username': '',
        'locomotiveName': '',
        'carType': 0
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
        'locomotiveName': '',
        'carType': 1
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
        'locomotiveName': '',
        'carType': 2,
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
        'locomotiveName': '',
        'locomotiveType': 0,
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
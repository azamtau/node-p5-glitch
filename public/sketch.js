let state;
let uselessCounter = 0;
let stateChanged = false; // NEW
    
function setup() {
  createCanvas(400, 400);
  state = 'start';
}

function draw() {
  background(220);
  
  if (state === 'start') {
    start();
  }
  else if(state === 'game') {
    game();
  }
  else if(state === 'over') {
    over();
  }
  
  if (state === 'start' && keyIsPressed && key === 's') {
    state = 'game';
  }
  if (state === 'over' && keyIsPressed && key === 'r') {
    /** Option 1: radical page reload */
    document.location.reload(true);
    
    /** Option 2: soft state change */
    // state = 'start';
    // uselessCounter = 0;
  }

}

function start() {
  text('Press S to start', 40, 50, 50);
}

function game() {
  // Here goes your code 
  // ...
  background(0, 112, 255);
  
  // this condition is just for holding game state for few seconds
  uselessCounter++;
  if (uselessCounter > 200) { 
    state = 'over'; 
    stateChanged = true; // NEW
  }
}

function over() {
  background(255, 112, 112);
  text('GAME OVER', 40, 50, 50);
  text('press R to restart', 60, 80, 150);
  
  // NEW
  if (stateChanged) {
    stateChanged = false;
    let body = document.querySelector('body');
    
    let form = document.createElement('form');
    form.setAttribute('class', 'form');

    let newBtn = document.createElement('button');
    newBtn.textContent = "Save";
    
    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter name to save score');
    newInput.setAttribute('maxlength', 20);
    newInput.required = true;

    let allBtn = document.createElement('button');
    allBtn.textContent = "Get TOP3";
    allBtn.setAttribute('class', 'top-btn');

    let topDiv = document.createElement('div');
    topDiv.setAttribute('class', 'top-list');

    body.appendChild(allBtn);
    body.appendChild(topDiv);

    body.appendChild(form);
    form.appendChild(newInput);
    form.appendChild(newBtn);
    
    form.addEventListener('submit', (e) => {
      console.log("button pressed");
      fetch('/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },        
          body: JSON.stringify({name: newInput.value, score: 120})
      })
      .then(resp => resp.json())
      .then(data => {
              console.log(data);
      })
      .catch(e => console.log(e));

      e.preventDefault();
    });

    allBtn.addEventListener('click', (event) => {
      fetch('/top/3')
          .then(resp => resp.json())
          .then(data => {
              let ol = document.createElement('ol');
              let jd = JSON.parse(data.top);
              if(topDiv.hasChildNodes()) {
                while (topDiv.firstChild) {
                  topDiv.removeChild(topDiv.firstChild);
                }
                ol.remove();
              }  
              
              for (let item of jd) {
                console.log(item.username, item.score);
                let li = document.createElement('li');
                li.textContent = `${item.username}: \t${item.score}`;
                ol.appendChild(li);
              }
              topDiv.appendChild(ol);
          })
          .catch(e => console.log(e));
    });
  }
}

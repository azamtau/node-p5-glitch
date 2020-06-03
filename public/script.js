let resBtn = document.querySelector('#results-btn');
let saveBtn = document.querySelector('#save-btn');

resBtn.addEventListener('click', (event) => {
    fetch('/top/3')
        .then(resp => resp.json())
        .then(data => {
            let resDiv = document.querySelector('#results-list');
            let ul = document.createElement('ul');
            let jd = JSON.parse(data.top);
            for (let item of jd) {
                console.log(item.username, item.score);
                let li = document.createElement('li');
                li.textContent = `${item.username}: \t${item.score}`;
                ul.appendChild(li);
            }
            resDiv.appendChild(ul);
        })
        .catch(e => console.log(e));
});

// saveBtn.addEventListener('submit', (event) => {
//     let userTxt = document.querySelector('#user');
//     fetch('/add', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },        
//         body: JSON.stringify({name: userTxt.value, score: 120})
//     })
//         .then(resp => resp.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(e => console.log(e));
//     event.preventDefault();
// });

saveBtn.addEventListener('submit', (event) => {
    let userTxt = document.querySelector('#user');
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },        
        body: JSON.stringify({name: userTxt.value, score: 120})
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
        .catch(e => console.log(e));
    event.preventDefault();
});
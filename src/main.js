
let data = localStorage.data ? JSON.parse(localStorage.data) : []
console.log(data)
data.map((elememt) => createContainer(elememt.input, elememt.prior, elememt.time)).forEach(e => document.getElementById('viewSection').appendChild(e))
let counter = document.getElementById("counter");
counter.innerHTML = data.length;

function addItem(){
    let input = document.getElementById('textInput');
    //break if text is empty:
    if (input.value == ''){
        alert("Please insert value!")
        input.focus();
        return;
    }
    let time = new Date().toISOString().slice(0, 20).replace('T', ' ');
    let counter = document.getElementById("counter");
    counter.innerHTML = parseInt(counter.innerHTML) +1;
    let prior = document.getElementById('prioritySelector');
    let viewSec = document.getElementById('viewSection');
    let newContainer = createContainer(input.value, prior.value, time);
    data.push({
        input: input.value,
        prior:prior.value,
        time: time
    })
    window.localStorage.setItem('data', JSON.stringify(data))
    viewSec.appendChild(newContainer);
    input.focus(); input.value = ''; 
}

// creating timestamp for task:
/* function getTime() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    today = dd+'/'+mm+'/'+yyyy+" "+hh+":"+min+":"+ss;
    return today; 
} */

//Container Creation:
function createContainer(todoText,prior, time){
    let newContainer = document.createElement('div')
    newContainer.className = "todoContainer";
    let priorDiv = document.createElement('div')
    priorDiv.className = "todoPriority";
    priorDiv.innerHTML = prior;
    let timeDiv = document.createElement('div')
    timeDiv.className = "todoCreatedAt";
    timeDiv.innerHTML = time;
    let todoDiv = document.createElement('div')
    todoDiv.className = "todoText";
    todoDiv.innerHTML = todoText;
    let removeButton = document.createElement('button')
    removeButton.innerHTML = 'X';
    removeButton.onclick = function() {
        newContainer.remove();
        let counter = document.getElementById("counter");
        counter.innerHTML = parseInt(counter.innerHTML) -1;
        data = data.filter(e => e.time !== time)
        window.localStorage.setItem('data', JSON.stringify(data))
    }

    newContainer.appendChild(priorDiv);
    newContainer.appendChild(timeDiv);
    newContainer.appendChild(todoDiv);
    newContainer.appendChild(removeButton);
    newContainer.className = "todoContainer"

    return newContainer;
}

// Sorting the list:
function sortTasks(){
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("viewSection");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByClassName("todoContainer"); 
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (b[i].innerHTML < b[i + 1].innerHTML){
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}


function addItem(){
    let input = document.getElementById('textInput');
    if (input.value == ''){
        alert("Please insert value!")
        input.focus();
        return;
    }
    let prior = document.getElementById('prioritySelector');
    let viewSec = document.getElementById('viewSection');
    let newContainer = createContainer(input.value, prior.value);
    viewSec.appendChild(newContainer);
    input.focus(); input.value = ''; 
}

// creating timestamp for task:
function getTime() {
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
}

//Container Creation:
function createContainer(todoText,prior){
    let newContainer = document.createElement('div')
    newContainer.className = "todoContainer";
    let priorDiv = document.createElement('div')
    priorDiv.className = "priority";
    priorDiv.innerHTML = prior;
    let timeDiv = document.createElement('div')
    timeDiv.className = "todoCreatedAt";
    timeDiv.innerHTML = getTime();
    let todoDiv = document.createElement('div')
    todoDiv.className = "todoText";
    todoDiv.innerHTML = todoText;
    
    newContainer.appendChild(priorDiv);
    newContainer.appendChild(timeDiv);
    newContainer.appendChild(todoDiv);
    return newContainer;
}
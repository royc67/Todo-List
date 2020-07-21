
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
    let time = new Date().toISOString()
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

//Container Creation:
function createContainer(todoText,prior, time){
    let newContainer = document.createElement('div')
    newContainer.className = "todoContainer";
    let priorDiv = document.createElement('div')
    priorDiv.className = "todoPriority padder";
    priorDiv.innerHTML = prior;
    let timeDiv = document.createElement('div')
    timeDiv.className = "todoCreatedAt padder";
    timeDiv.innerHTML = time.slice(0, 19).replace('T', ' ');
    let todoDiv = document.createElement('div')
    todoDiv.className = "todoText padder";
    todoDiv.innerHTML = todoText;
    let removeButton = document.createElement('button')
    removeButton.innerHTML = 'X';
    removeButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'
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

// Sorting the list By priority:
function sortBy(){
    let list, i, switching, b, shouldSwitch, sortBySelector;
    sortBySelector = document.getElementById("sortBySelector").value;
    list = document.getElementById("viewSection");
    switching = true;
    while (switching) {
        switching = false;
        prior = list.getElementsByClassName(sortBySelector); 
        b = list.getElementsByClassName("todoContainer"); 
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (prior[i].innerHTML < prior[i + 1].innerHTML){
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

//Search Feature:
function runSearch() {
    var input, filter, viewSection, todoContainer, todoText, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    viewSection = document.getElementById("viewSection");
    todoContainer = viewSection.getElementsByClassName("todoContainer");
    for (i = 0; i < todoContainer.length; i++) {
        todoText = todoContainer[i].getElementsByClassName("todoText")[0];
        txtValue = todoText.textContent || todoText.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            todoContainer[i].style.display = "";
        } else {
            todoContainer[i].style.display = "none";
        }
    }
}

function isEnter(event){
    if (event.keyCode == 13) addItem();
}
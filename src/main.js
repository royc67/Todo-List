

function addItem(){
    let input = document.getElementById('textInput');
    let prior = document.getElementById('prioritySelector');
    let prior = document.getElementById('prioritySelector');
    




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
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    today = dd+'/'+mm+'/'+yyyy+" "+hh+":"+min;
    return today; 
}
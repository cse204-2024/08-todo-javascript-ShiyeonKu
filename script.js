//grab todo list from the api
document.getElementById("submit_todo").addEventListener("click", postTodo);

function initialize(){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let todos = JSON.parse(this.responseText);
            console.log(todos);
        }
    };
    
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp.send();
}


//set variable from the form as a new todo and add to the list
function postTodo(){
    console.log(document.getElementById("add_todo").value);
}

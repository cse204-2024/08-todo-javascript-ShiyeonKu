//grab todo list from the api
initialize();
document.getElementById("submit_todo").addEventListener("click", postTodo);

function initialize(){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            console.log(todo);
        }
    };
    
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp.send();
    
}

//set variable from the form as a new todo and add to the list
function postTodo(){
    let data={
        text: document.getElementById("add_todo").value
    };
    console.log(JSON.stringify(data));

    let xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            console.log(todo);
            for (i = 0; i < todo.length; i++){
                let newtodo = document.createElement("input");
                newtodo.setAttribute("type", "checkbox");
                newtodo.setAttribute("value", todo[i].text);
                document.getElementById("nc_todo").appendChild(newtodo);
            }
        }else if(this.readyState == 4){
            console.log(this.responseText);
        }
    };

    xhttp2.open("POST", "https://cse204.work/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp2.send(JSON.stringify(data));
}

function getTodo(){

}
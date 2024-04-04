//grab todo list from the api
initialize();
document.getElementById("submit_todo").addEventListener("click", postTodo);


function initialize(){
    //erase if there's already elements
    let parent = document.getElementById("nc_todo");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            console.log(todo);
            for (i = 0; i < todo.length; i++){
                let new_div = document.createElement("div");
                new_div.setAttribute("class", "todo_list");

                let label_div = document.createElement("div");
                label_div.setAttribute("class", "label_div");
                
                let newtodo = document.createElement("input");
                newtodo.setAttribute("type", "checkbox");
                newtodo.setAttribute("class", "check");
                newtodo.setAttribute("id", todo[i].id);
                newtodo.addEventListener("change", getTodo);

                let newtodo_label = document.createElement("label");
                newtodo_label.setAttribute("id", "label" + todo[i].id);
                newtodo_label.textContent = todo[i].text;

                let newtodo_button = document.createElement("button");
                newtodo_button.setAttribute("type", "submit");
                newtodo_button.setAttribute("class", "delete_btn");
                newtodo_button.setAttribute("id", todo[i].id);
                newtodo_button.textContent = "Delete";
                newtodo_button.addEventListener("click", deleteTodo);

                
                label_div.appendChild(newtodo);
                label_div.appendChild(newtodo_label);
                new_div.appendChild(label_div);
                new_div.appendChild(newtodo_button);
                if(todo[i].completed){
                    document.getElementById("c_todo").appendChild(new_div);
                }else{
                    document.getElementById("nc_todo").appendChild(new_div);
                }
            }
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
        }else if(this.readyState == 4){
            console.log(this.responseText);
        }
    };
    xhttp2.open("POST", "https://cse204.work/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp2.send(JSON.stringify(data));
    initialize();
}

function getTodo(){
    let id = this.id;
    if(document.getElementById(id).checked){
        updateCheckedStatus(id);
    }else{
        updateUnchecked(id);
    }

    let xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            console.log(todo);
        }else if (this.readyState == 4){
            console.log(this.responseText);
        }

    };
    xhttp2.open("GET", "https://cse204.work/todos/"+ id, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    //xhttp2.setRequestHeader(JSON.stringify(data));
}

function updateCheckedStatus(id){
    let content_id = id;

    let xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            todo.completed = true;
            console.log(todo);
            document.getElementById("label"+todo.id).style.fontStyle = "italic";
            document.getElementById("label"+todo.id).style.fontWeight = "600";

            //take completed from the uc list and tun to the c list
        }else if (this.readyState == 4){
            console.log(this.responseText);
        }
    };
    xhttp2.open("PUT", "https://cse204.work/todos/"+ content_id, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp2.send();
}
function updateUnchecked(id){
    let content_id = id;

    let xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let todo = JSON.parse(this.responseText);
            todo.completed = true;
            console.log(todo);
            document.getElementById("label"+todo.id).style.fontStyle = "normal";
            document.getElementById("label"+todo.id).style.fontWeight = "200";

            //take completed from the uc list and tun to the c list
        }else if (this.readyState == 4){
            console.log(this.responseText);
        }
    };
    xhttp2.open("PUT", "https://cse204.work/todos/"+ content_id, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp2.send();
}

function deleteTodo(){
    let id = this.id;
    
    let xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //let todo = JSON.parse(this.responseText);
            //console.log(todo);
        }else if (this.readyState == 4){
            console.log(this.responseText);
        }
    };
    xhttp2.open("DELETE", "https://cse204.work/todos/"+ id, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d4681d-747376-1752ce-4282a1-053f50");
    xhttp2.send();
    initialize();
}
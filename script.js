let body = document.getElementById("container");

let TaskNum = [];

window.onload = function(){
    input.focus()
    getTaskFromStorage()
    renderTasks()
}

body.style.cssText = `
    background-color: #c56969;
    width: 90%;
    max-width: 600px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;   
    align-items: center;
    border-radius: 8px;
    padding: 10px;
`;

let AddingTask = document.createElement("div");
AddingTask.style.cssText = `
    display: flex;
    width: 90%;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    padding: 5px; 
    gap: 10px; 
    margin-top:10px`;

let input = document.createElement("input");
input.placeholder = "Add a new task...";
input.style.cssText = `
    border: none;
    flex: 1;
    height: 40px;
    padding: 0 10px;
    outline: none;
    font-size: 18px;
    font-wight:bold;`;

let Plus = document.createElement("div");
Plus.innerHTML = "+";
Plus.style.cssText = `
    background-color: #eee;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    border-radius: 4px;`;
Plus.style.transition = "0.3s";

let tasksContainer = document.createElement("div");
tasksContainer.style.cssText = `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`;

AddingTask.appendChild(input);
AddingTask.appendChild(Plus);
body.appendChild(AddingTask);
body.appendChild(tasksContainer);

function getTaskFromStorage() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        TaskNum = JSON.parse(storedTasks);
    }
}

function renderTasks() {
    tasksContainer.innerHTML = "";

    TaskNum.forEach((taskText, index) => {
        let task = document.createElement("div");

        task.style.cssText = `
            width: 90%;
            background-color: white;
            padding: 10px;
            border-radius: 5px;
            margin-top:10px;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left:10px;
            font-weight: bold;
        `;
        let texttask = document.createElement("div");
        texttask.innerHTML = taskText;

        let delet = document.createElement("div");
        delet.innerHTML = "Delete";
        delet.style.cssText = `
            background-color: #d33131f7;
            padding: 6px 10px; 
            color: white;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
            border-radius: 6px;
        `;
        let Update = document.createElement("div");
        Update.innerHTML = "Edit";
        Update.style.cssText = `
            background-color: #1c7b1c;
            padding: 6px 10px; 
            color: white;
            font-weight:bold;
            cursor:pointer;
            border-radius:5px;
        `;

        delet.addEventListener("click", () => {
            TaskNum.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(TaskNum));
            renderTasks();
        });
        Update.addEventListener("click", () => {
            let currentText = texttask.textContent;

            let inputEdit = document.createElement("input");
            inputEdit.value = currentText;
            inputEdit.style.cssText = `
                flex: 1;
                min-width: 150px;
                padding:10px;
                font-weight:bold;
            `;

            task.innerHTML = "";
            task.appendChild(inputEdit);

            let save = document.createElement("button");
            save.innerHTML = "Save";
            save.style.cssText = `
                cursor:pointer;
                padding:8px;
                background-color:green;
                color:white;
                border-radius:3px;
                border:none;
                font-weight:bold;
            `;

            save.onclick = () => {
                if (inputEdit.value.trim() !== "") {
                    TaskNum[index] = inputEdit.value;
                    localStorage.setItem("tasks", JSON.stringify(TaskNum));
                    renderTasks();
                }
            };

            let cancel = document.createElement("button");
            cancel.innerHTML = "Cancel";
            cancel.style.cssText = `
                cursor:pointer;
                padding:8px;
                background-color:red;
                color:white;
                border-radius:3px;
                border:none;
                font-weight:bold;
                margin-left:5px;
            `;
            cancel.onclick = () => {
                renderTasks();
            };

            task.appendChild(cancel);
            task.appendChild(save);
        });
        let actions = document.createElement("div");
        actions.style.cssText = `
            display: flex;
            gap: 8px;
            margin-left: auto;
        `;

        actions.appendChild(Update);
        actions.appendChild(delet);
        texttask.addEventListener("click", () => {
            if (texttask.style.textDecoration === "line-through") {
                texttask.style.textDecoration = "none";
                texttask.style.color = "black";
            } else {
                texttask.style.textDecoration = "line-through";
                texttask.style.color = "gray";
            }
        });
        task.appendChild(texttask);
        task.appendChild(actions);
        tasksContainer.appendChild(task);
    });
}

Plus.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        Plus.style.transform = "rotate(180deg)";
        let taskText = input.value;
        TaskNum.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(TaskNum));
        renderTasks(); 
        input.value = "";
    } else {
        Swal.fire("The Input Is Empty!");
    }
});

    task.addEventListener("click",() => {
    AddingTask.style.textDecoration = "line-through"
    task.style.color = "gray";
})
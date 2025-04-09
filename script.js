const input = document.querySelector(".input_box");
const list = document.querySelector(".scroll");
const todoBox = document.querySelector(".todolist_rightside");
const counter = document.querySelector(".counter");

// Function to adjust box height dynamically
function adjustHeight() {
    let numTasks = list.children.length;
    todoBox.style.height = numTasks === 0 ? "100px" : `${list.scrollHeight + 50}px`;
    counter.innerText = `Number of tasks remaining: ${numTasks}`;
}

// Function to add tasks
function addvalue() {
    if (input.value.trim() === "") {
        alert("Kindly enter any task!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = input.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    list.appendChild(li);
    input.value = "";

    savedata();
    adjustHeight();
}

// Task complete and delete event
list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
        adjustHeight();
    }
});

// Save data in localStorage
function savedata() {
    let tasks = [];
    document.querySelectorAll("li").forEach(item => {
        tasks.push({ text: item.childNodes[0].nodeValue, checked: item.classList.contains("checked") });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load data when page opens
function getdata() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        list.innerHTML = "";
        storedTasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.text;

            if (task.checked) {
                li.classList.add("checked");
            }

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            list.appendChild(li);
        });
    }

    adjustHeight();
}

// Ensure data is loaded when the page starts
document.addEventListener("DOMContentLoaded", function () {
    getdata();
});

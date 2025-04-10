const input = document.querySelector(".input_box");
const list = document.querySelector(".scroll");
function addvalue() {
    if (input.value.trim() === "") {
        alert("Kindly enter any task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = input.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    list.appendChild(li);
    input.value = "";

    savedata();

}
list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
});

function savedata() {
    let tasks = [];
    document.querySelectorAll("li").forEach(item => {
        tasks.push({ text: item.childNodes[0].nodeValue, checked: item.classList.contains("checked") });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getdata() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        list.innerHTML = "";
        storedTasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;

            if (task.checked) {
                li.classList.add("checked");
            }

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            list.appendChild(li);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getdata();
});

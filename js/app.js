//Selectors 
const gratInput = document.querySelector(".grat-input");
const gratButton = document.querySelector(".grat-button");
const gratList = document.querySelector(".grat-list");
const filterOption = document.querySelector(".filter-grat");

//Event Listeners
gratButton.addEventListener("click", addgrat);
gratList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filtergrat);

//Functions
function addgrat(event) {
    //Prevent form from submitting
    event.preventDefault();
    //grat DIV
    const gratDiv = document.createElement("div");
    gratDiv.classList.add("grat");
    //create LI
    const newgrat = document.createElement("li");
    newgrat.innerText = gratInput.value;
    newgrat.classList.add("grat-item");
    gratDiv.appendChild(newgrat);
    //ADD grat TO LOCALSTORAGE
    saveLocalgrats(gratInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    gratDiv.appendChild(completedButton);
    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    gratDiv.appendChild(trashButton);
    //APPEND to LIST
    gratList.appendChild(gratDiv);
    //Clear grat INPUT VALUE
    gratInput.value = "";
}

function deleteCheck(e) {
    var item = e.target;

    if (item.classList[0] === "trash-btn") {
        const grat = item.parentElement;
        grat.classList.add("fall");
        grat.addEventListener('transitioned', function() {
            grat.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const grat = item.parentElement;
        grat.classList.toggle("completed");
    }
}

function filtergrat(e) {
    const grats = gratList.childNodes;
    grats.forEach(function(grat) {
        switch (e.target.value) {
            case "all":
                grat.style.display = "flex";
                break;
            case "completed":
                if (grat.classList.contains("completed")) {
                    grat.style.display = "flex";
                } else {
                    grat.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!grat.classList.contains("completed")) {
                    grat.style.display = "flex";
                } else {
                    grat.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalgrats(grat) {
    //CHECK ---- HEY DO I already have thing in there?
    let grats;
    if (localStorage.getItem('grats') === null) {
        grats = [];
    } else {
        grats = JSON.parse(localStorage.getItem('grats'));
    }
    grats.push(grat);
    localStorage.setItem('grat', JSON.stringify(grats));
}
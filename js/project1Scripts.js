let navigationOptions = document.querySelectorAll(".navOpt")
let targetView = document.querySelector("#home")
window.onload = () => {
    targetView.style.display = "block";
}

navigationOptions.forEach((btn) => {

    btn.addEventListener('click', function (event) {
        document.querySelectorAll(".screen").forEach( (screen) => {
            screen.style.display="none";
        })
        switch (event.target.getAttribute('data-screens')) {
            case "home":
                loadHome()
                break
            case "filter":
                loadFilter()
                break
            case "data":
                loadData()
                break
        }

    })
})


function loadHome() {
    targetView = document.querySelector("#home")
    targetView.style.display = "block";
}

function loadFilter() {
    targetView = document.querySelector("#filter")
    targetView.style.display = "block";
}

function loadData(){
    targetView = document.querySelector("#data")
    targetView.style.display = "block";
}




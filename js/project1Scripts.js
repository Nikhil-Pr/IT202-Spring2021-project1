let navigationOptions = document.querySelectorAll(".navOpt")
let targetView = document.querySelector("#home")
let fetchRequest = "https://data.cityofchicago.org/resource/aksk-kvfp.json?"
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

function handleFilter(){
    let filterName = document.querySelector("#filterName")
    let filterPin = document.querySelector("#filterPin")
    let filterAddress = document.querySelector("#filterAddress")
    let filterSqft = document.querySelector("#filterSqft")
    let filterNumber = document.querySelector("#filterNumber")
    let filterZIP = document.querySelector("#filterZIP")
    fetchRequest = "https://data.cityofchicago.org/resource/aksk-kvfp.json?"
    if(filterName.value !== ""){
        fetchRequest += `&community_area_name=${filterName.value}`
    }
    if(filterPin.value !== ""){
        fetchRequest += `&pin=${filterName.value}`
    }
    if(filterAddress.value !== ""){
        fetchRequest += `&address=${filterAddress.value}`
    }
    if(filterSqft.value !== ""){
        fetchRequest += `&sq_ft=${filterSqft.value}`
    }
    if(filterNumber.value !== ""){
        fetchRequest += `&community_area_number=${filterNumber.value}`
    }
    if(filterZIP.value !== ""){
        fetchRequest += `&zip_code=${filterZIP.value}`
    }

    console.log(fetchRequest)

}


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




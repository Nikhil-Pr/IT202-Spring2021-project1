let navigationOptions = document.querySelectorAll(".navOpt")
let targetView = document.querySelector("#home")
let fetchRequest = "https://data.cityofchicago.org/resource/aksk-kvfp.json?"
window.onload = () => {
    targetView.style.display = "block";
}

navigationOptions.forEach((btn) => {

    btn.addEventListener('click', function (event) {
        clearScreens()
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
            case "map":
                loadMap()
                break
            case "about":
                loadAbout()
                break
        }

    })
})

function handleFilter() {
    let filterName = document.querySelector("#filterName")
    let filterPin = document.querySelector("#filterPin")
    let filterAddress = document.querySelector("#filterAddress")
    let filterSqft = document.querySelector("#filterSqft")
    let filterNumber = document.querySelector("#filterNumber")
    let filterZIP = document.querySelector("#filterZIP")
    fetchRequest = "https://data.cityofchicago.org/resource/aksk-kvfp.json?"
    if (filterName.value !== "") {
        fetchRequest += `&community_area_name=${filterName.value}`
    }
    if (filterPin.value !== "") {
        fetchRequest += `&pin=${filterPin.value}`
    }
    if (filterAddress.value !== "") {
        fetchRequest += `&address=${filterAddress.value}`
    }
    if (filterSqft.value !== "") {
        fetchRequest += `&sq_ft=${filterSqft.value}`
    }
    if (filterNumber.value !== "") {
        fetchRequest += `&community_area_number=${filterNumber.value}`
    }
    if (filterZIP.value !== "") {
        fetchRequest += `&zip_code=${filterZIP.value}`
    }
    clearScreens()
    loadData()
}

function clearScreens() {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.style.display = "none";
    })
}

function loadHome() {
    targetView = document.querySelector("#home")
    targetView.style.display = "block";
}

function loadFilter() {
    targetView = document.querySelector("#filter")
    targetView.style.display = "block";
}

function loadData() {
    targetView = document.querySelector("#data")
    targetView.style.display = "block";
    let cardClone = document.querySelector(".infoCard").cloneNode(true)
    document.querySelectorAll(".infoCard").forEach(item => item.parentNode.removeChild(item))
    fetch(fetchRequest)
        .then(response => response.json())
        .then(data => {
            data.forEach(row => {
                let cardCloneLoop = cardClone.cloneNode(true)
                cardCloneLoop.querySelector('.card-title').innerHTML = `${row.community_area_name ?? "No Community Area Name Specified"} <br /> ${row.pin ?? "No Pin Specified"}`
                cardCloneLoop.querySelector('.card-text').innerHTML = `Address: ${row.address ?? "No Address Specified"} <br /> Sqft: ${row.sq_ft ?? "No Sqft Specified"}`
                document.querySelector('#cards').appendChild(cardCloneLoop)
            })
        })
}

function loadMap() {
    targetView = document.querySelector("#mapScreen")
    targetView.style.display = "block";
    const chicagoLatLng = {lat: 41.8781, lng: -87.6298}
    const dataMap = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: chicagoLatLng
    })
    fetch(fetchRequest)
        .then(response => response.json())
        .then(data => {
            data.forEach(row => {
                let marker = new google.maps.Marker({
                    position: {lat: parseFloat(row.latitude), lng: parseFloat(row.longitude)},
                    map: dataMap
                })
                let infoWindow = new google.maps.InfoWindow({
                    position: {lat: parseFloat(row.latitude), lng: parseFloat(row.longitude)},
                    content:
                        `
                    <h4>${row.community_area_name ?? "No Community Area Name Specified"}</h4>
                    <h6>Pin: ${row.pin ?? "No Pin Specified"}</h6>
                    <h5>Address: ${row.address ?? "No Address Specified"} </h5>
                    <h6>Sqft:${row.sq_ft ?? "No Sqft Specified"}</h6>
                    `
                })
                marker.addListener("mouseover", () => infoWindow.open(dataMap, marker))
                marker.addListener("mouseout", () => infoWindow.close(dataMap, marker))
            })
        })

}

function loadAbout() {
    targetView = document.querySelector("#about")
    targetView.style.display = "block";
}




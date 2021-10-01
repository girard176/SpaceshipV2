/*
    Author: Andre
    JavaScript for the spaceship website
    API ref: https://lldev.thespacedevs.com/2.2.0/config/spacecraft/
*/

// Variables
const shipDataUrl = "https://lldev.thespacedevs.com/2.2.0/config/spacecraft/?in_use=true&human_rated=true&order=name";
const shipList = document.getElementById("ship-list");
const shipImage = document.getElementById("ship-image");
const shipInfo = document.getElementById("ship-info");

// When the page load
window.addEventListener("load", updateShipList);

// Retreive the spaceships data
async function getShipData(){
    return fetch(shipDataUrl).then(response => response.json());
}

// Add spaceships to drop down list
function updateShipList(){
    getShipData().then(function(data){
            console.log("Updating ship list: ")
            for(element in data.results){
                let option = createOption(data.results[element].id, data.results[element].name);
                shipList.appendChild(option);
            }
        }
    );
}

function createOption(id, text){
    let option = document.createElement("option");
    option.id = id;
    option.textContent = text;
    console.log(option.text);
    console.log(option.id);
    return option;
}

// When a spaceship is selected from the list
shipList.addEventListener("change", function(){
    console.log("Selection made")
    let id = this.options[this.selectedIndex].id;
    console.log(this.value);
    console.log(id);
    selectShipData(id);
});

// Retrieve ship data
function selectShipData(id) {
	fetch(`https://lldev.thespacedevs.com/2.2.0/config/spacecraft/${id}`)
		.then(res => res.json())
		.then(data => {
			shipImage.innerHTML = `<img src=${data.image_url} alt="Ship" />`
		});
}
const deleteRestaurant = async (id) => {
    if (id) {
        try {
            const restaurant = await fetch(
            "http://localhost:5000/apis/restaurants/" + id,
            {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: { 
                    "Content-Type": "application/json",
                },
            }
            )
                .then((response) => {
                return response.json();
                })
                .then((response) => {
                alert(`Restaurant id:${id} is delete`);
                location.reload();
                });
        } catch (error) {
            alert(`Restaurant id:${id} not found`);
        }
    } else {
        alert("Restaurant ID is missing");
    }
};

const addRestaurant = (element) => {
    const item = document.createElement("div");
    item.className = "card";
    item.style = "width: 20rem;";
    
    const card = `
                <img src="${element.imageurl}" class="card-img-top" alt="${element.name}">  
                <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.type}</p> 
                        <a href="#" class="btn btn-danger" onclick="deleteRestaurant(${element.id})">Delete</a>   
                        <a href="edit.html?id=${element.id}" class="btn btn-warning">Edit</a>    
                </div>
    `;
    item.innerHTML = card;
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.appendChild(item);
};


const removeAllResult = () => {
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.innerHTML = "";
};

const searchRestaurant = async(event) => {
    const keyword = event.target.value;
    if (event.key === "Enter" && keyword) {
        const allRestaurants = await fetch(
            "http://localhost:5000/apis/restaurants",
            {   
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: { 
                "Content-Type": "application/json",
            },
        }).then((response) => {
            return response.json();
        });

        //console.log(allRestaurant);
        const result = allRestaurants.filter(
            (item) => item.name.includes(keyword) || (item).type.includes(keyword)
        );

        //console.log(result);
        removeAllResult();
        result.forEach((element) => addRestaurant(element));
    }
};

const main = () => {
    const inputElement = document.querySelector(".search");
    inputElement.addEventListener("keydown", searchRestaurant);
};

main();
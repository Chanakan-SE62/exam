const init = async () => {
    const allUser = await fetch("http://localhost:5000/apis/user", {
    
    method: "GET",
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    }).then((response) => response.json());
    allUser.forEach((element) => addUser(element));

    //allRestaurants.restaurants.forEach((element) => addRestaurant(element));
};

const addUser = (element) => {
    const item = document.createElement("tr");
    item.className = "tr";
    item.style = "width: 20rem;";
    
    const tbody = `
                    <th scope="row">${element.id}</th>
                    <td>${element.username}</td>
                    <td>${element.email}</td>
                    <td>${element.tel}</td>
                    <td>
                        <a href="#" class="btn btn-danger" onclick="deleteUser(${element.id})">Delete</a>   
                        <a href="edit_user.html?id=${element.id}" 
                        class="btn btn-warning" style="margin-left: 20px;">Edit</a>
                    </td>
    `;
    item.innerHTML = tbody;
    const usersElement = document.querySelector(".users");
    usersElement.appendChild(item);
};

const deleteUser = async (id) => {
    if (id) {
        try {
            const user = await fetch(
            "http://localhost:5000/apis/user/" + id,
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
                alert(`User id:${id} is delete`);
                location.reload();
                });
        } catch (error) {
            alert(`User id:${id} not found`);
        }
    } else {
        alert("User ID is missing");
    }
};
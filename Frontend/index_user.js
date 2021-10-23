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
                        <a href="edit_user.html?id=${element.id}" class="btn btn-warning" 
                        style="margin-left: 20px;">Edit</a>
                    </td>
    `;
    item.innerHTML = tbody;
    const usersElement = document.querySelector(".users");
    usersElement.appendChild(item);
};


const removeAllResult = () => {
    const userElement = document.querySelector(".users");
    userElement.innerHTML = "";
};

const searchUser = async(event) => {
    const keyword = event.target.value;
    if (event.key === "Enter" && keyword) {
        const allUsers = await fetch(
            "http://localhost:5000/apis/user/",
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
        const result = allUsers.filter(
            (item) => item.username.includes(keyword)
        );

        //console.log(result);
        removeAllResult();
        result.forEach((element) => addUser(element));
    }
};

const main = () => {
    const inputElement = document.querySelector(".search");
    inputElement.addEventListener("keydown", searchUser);
};

main();
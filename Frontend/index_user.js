
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

const searchUser = async(event) => { //เมื่อเกิด event
    const keyword = event.target.value; //เอาข้อมูลมาใส่ในตัวแปลชื่อ keyword
    if (event.key === "Enter" && keyword) { //เมื่อถูก enter และมี keyword แล้ว
        const allUsers = await fetch( //เชื่อมต่อ api
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
            return response.json(); //รีเทิร์นค่า response เป็น json
        });

        //console.log(allRestaurant);
        const result = allUsers.filter( //กรองข้อมูล
            (item) => item.username.includes(keyword) //จาก keyword ที่พิมพ์มา แล้วเอาไปเทียบกับค่า username
        );

        //console.log(result);
        removeAllResult(); //เรียกใช้ฟังก์ชัน removeAllResult ก่อน
        result.forEach((element) => addUser(element)); //สั่งลูป element แล้วเรียกใช้ addUser
    }
};

const main = () => {
    const inputElement = document.querySelector(".search"); //ดึงข้อมูลจากช่อง search
    inputElement.addEventListener("keydown", searchUser); //เรียกใช้ฟังก์ชัน searchUser เมื่อพิมพ์
};

main();
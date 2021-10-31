//แสดง data
const init = async () => {
    //ดึง data ทั้งหมดขึ้นมาแสดงผ่าน link api
    const allUser = await fetch("http://localhost:5000/apis/user", {
    
    method: "GET",
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    }).then((response) => response.json()); //ถ้าสำเร็จให้ส่ง response ออกไปเป็น json
    allUser.forEach((element) => addUser(element)); //แล้วให้ฟังก์ชัน allUser ลูป element ออกมา แล้วเรียกใช้ addUser ต่อ

    //allRestaurants.restaurants.forEach((element) => addRestaurant(element));
};

//เพิ่ม data 
const addUser = (element) => {
    const item = document.createElement("tr"); //สร้าง <tr> เก็บไว้ใน item
    item.className = "tr";
    item.style = "width: 20rem;";
    
    //สร้าง data ขึ้นมาในรูปแบบตาราง โดยใช้ภาษา html 
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
    item.innerHTML = tbody; //แทรก <> ที่อยู่ในตัวแปล tbody ลงใน <tr>
    const usersElement = document.querySelector(".users"); //เลือกคลาสที่มีชื่อว่า .users
    usersElement.appendChild(item); //แล้วแทรก item ลงไปเป็นข่ายลูก
};

//ลบ data จาก id ที่เลือก
const deleteUser = async (id) => {
    if (id) { //ถ้ามี id
        try {
            const user = await fetch( //ให้ดึง data จาก api
            "http://localhost:5000/apis/user/" + id, //เอา id ต่อท้ายลิ้ง
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
                .then((response) => { //ส่ง response ออกไป
                return response.json(); //รีเทิร์นเป็น json
                })
                .then((response) => { 
                alert(`User id:${id} is delete`); //แจ้งเตือนว่าลบสำเร็จ
                location.reload(); //รีหน้า
                });
        } catch (error) { //ถ้าทำใน try ไม่สำเร็จ
            alert(`User id:${id} not found`); //แจ้งเตือนว่าไม่พบไอดีนี้
        }
    } else { //ถ้าไม่มี id
        alert("User ID is missing");
    }
};
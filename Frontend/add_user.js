const add = async () => {
    const id = Number.parseInt(document.getElementById("id").value); //เก็บค่าจาก input ช่อง id แล้วแปลงเป็นเลข
    const username = document.getElementById("username").value; //เก็บค่า username จาก input
    const email = document.getElementById("email").value; //เก็บค่า email จาก input
    const tel = document.getElementById("tel").value; //เก็บค่า tel จาก input
    if (id && username && email && tel) { //ถ้ามีค่า id, username, email, tel ส่งมา
        const params = { //set พารามิเตอร์
            id: id,
            username: username,
            email: email,
            tel: tel,
        };
        try {
            const user = await fetch( //เชื่อมต่อ api
                "http://localhost:5000/apis/user",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params), // จัด params ให้อยู่ในรูปแบบของ json
                }
            ).then((response) => { //ส่ง response
                return response.json(); //รีเทิร์นค่าให้เป็น json
            }).then(() => {
                alert(`User id:${id} is added`); //แจ้งเตือนว่า add สำเร็จ
            });
        } catch (error) { //ถ้าเกิดข้อผิดพลาด
            alert(`add new User`); 
        }
    } else { //ถ้าไม่ครบ 
        alert("All fields are required!!"); //แจ้งเตือนว่า ต้องกรอกข้อมูลให้ครบทุกช่อง
    }
};
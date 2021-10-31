const init = async () =>{

    let params = new URL(document.location).searchParams; //คืนค่าออบเจ็กต์ที่มีชนิดข้อมูลเป็น URLSearchParams
    let id = params.get("id"); //รับ id จากตอนกด
    if(id){ //ถ้ามี id
        try{
            const user = await fetch( //เชื่อมต่อ api
                "http://localhost:5000/apis/user/" + id,{ //เอาไอดีที่ได้ไปต่อท้าย
                method: "GET",      
                mode:"cors",
                cache:"no-cache",
                credentals:"same-origin",
                headers:{
                    "Content-type":"application/json"
                },
            }).then((response)=>{ 
                return response.json(); //รีเทิร์นค่า response ออกมาเป็น json
            });

            //set input value
            document.getElementById("id").value = user.id; //ดึงค่า id มาวางในช่อง
            document.getElementById("username").value = user.username; //ดึงค่า username มาวางในช่อง
            document.getElementById("email").value = user.email; //ดึงค่า email มาวางในช่อง
            document.getElementById("tel").value = user.tel; //ดึงค่า tel มาวางในช่อง
        }catch (error){ //ถ้าเกิดผิดพลาด
            alert(`User id:${id} not found`); //แจ้งว่าไม่พบ id นี้
        }
    }else{ //ถ้าไม่มี id 
        alert("User ID is missing"); //แจ้งว่าไม่มีรหัสยูเซอร์นี้
    }
}

//ส่งกลับไปที่ database
const edit = async () => {
    const id = document.getElementById("id").value; //เก็บค่า id จากช่อง input
    if (id) { //ถ้ามี id
        const params = { 
            id: document.getElementById("id").value, //เอา id ในช่อง input ไปใส่ฐานข้อมูล
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            tel: document.getElementById("tel").value,
        };
        try {
        const user = await fetch( //เชื่อมต่อ api
          "http://localhost:5000/apis/user/" + id, //ต่อท้ายด้วย id
          {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params), //จัด params ให้อยู่ในรูปแบบของ json
          }
        ).then((response) => {
          return response.json(); //รีเทิร์นเป็น json
        }).then(()=>{
          alert(`User id:${id} is update`); //แจ้งว่า update สำเร็จ
        });
      } catch (error) {
        alert(`User id:${id} not found`); //แจ้งว่า ไม่พบ id นี้
      }
    } else {
      alert("user ID is missing"); //แจ้งว่า ไม่มี id นี้
    }
};
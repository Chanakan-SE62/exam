const init = async () =>{
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    if(id){
        try{
            const restaurant = await fetch(
                "http://localhost:5000/apis/restaurants/" + id,{
                method: "GET",          
                mode:"cors",
                cache:"no-cache",
                credentals:"same-origin",
                headers:{
                    "Content-type":"application/json"
                },
            }).then((response)=>{
                return response.json();
            });
            //set input value 19-22
            document.getElementById("id").value = restaurant.id;
            document.getElementById("name").value = restaurant.name;
            document.getElementById("type").value = restaurant.type;
            document.getElementById("imageurl").value = restaurant.imageurl;
        }catch (error){
            alert(`Restaurant id:${id} not found`)
        }
    }else{
        alert("restaurant ID is missing");
    }
}


const edit = async () => {
    const id = document.getElementById("id").value;
    if (id) {
        const params = {

            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            type: document.getElementById("type").value,
            imageurl: document.getElementById("imageurl").value,
        };
      try {
        const restaurant = await fetch(
          "http://localhost:5000/apis/restaurants/" + id,
          {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        ).then((response) => {
          return response.json();
        }).then(()=>{
          alert(`Restaurant id:${id} is update`);
        });
      } catch (error) {
        alert(`Restaurant id:${id} not found`);
      }
    } else {
      alert("restaurant ID is missing");
    }
};
const add = async () => {
    const id = Number.parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const imageurl = document.getElementById("imageurl").value;
    if (id && name && type && imageurl) {
        const params = {
            id: id,
            name: name,
            type: type,
            imageurl: imageurl,
        };
        try {
            const restaurant = await fetch(
                "http://localhost:5000/apis/restaurants",
                {
                    method: "POST",
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
            }).then(() => {
                alert(`Restaurant id:${id} is added`);
            });
        } catch (error) {
            alert(`add new restaurant`);
        }
    } else {
        alert("All fields are required!!");
    }
};
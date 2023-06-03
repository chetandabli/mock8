let form = document.getElementById("form");

if(!localStorage.getItem("token")){
    alert("please login first");
    location.replace("../index.html")
}

form.onsubmit = async(e)=>{
    e.preventDefault();
    let name = form.name;
    let description = form.description;
    let category = form.category;
    let image = form.image;
    let location = form.location;
    let price = form.price;

    if(name.value && description.value && category.value && image.value && location.value && price.value){
        let obj = {
            "name": name.value,
            "description": description.value,
            "category": category.value,
            "image": image.value,
            "location": location.value,
            "price": price.value
        }

        try {
            if(!localStorage.getItem("token")){
                location.assing("../index.html")
            }
            let res = await fetch("http://localhost:3000/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj)
            });
            res = await res.json()
            if(res.msg){
                alert(res.msg);
                name.value = "";
                description.value = "";
                category.value = "";
                image.value = "";
                location.value = "";
                price.value = ""
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        alert("Please fill all details")
    }
}
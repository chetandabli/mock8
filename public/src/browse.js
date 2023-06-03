let i = 1;

async function fetchDataLength(){
    try {
       let datalength = await fetch("http://localhost:3000/post") 
       datalength= await datalength.json();
       appendbtn(datalength.length)
    } catch (error) {
        console.log(error)
    }
}
fetchDataLength()
async function fetchData(id){
    try {
       let data = await fetch(`http://localhost:3000/post/${id}`) 
       data= await data.json();
       appendData(data)
    } catch (error) {
        console.log(error)
    }
}
fetchData(i);

function appendbtn(num){
    let pages = Math.ceil(num/4);
    document.getElementById("pagination").innerHTML = null
    for(let i = 0; i < pages; i++){
        let btn = document.createElement("button");
        btn.innerText = i+1;
        btn.setAttribute("data-id", i+1);

        document.getElementById("pagination").append(btn)
    }
    let btn = document.querySelectorAll("button");

for(let i = 0; i < btn.length; i++){
    btn[i].onclick = ()=>{
        fetchData(btn[i].innerText)
    }
}
}


let filter = document.getElementById("category");

filter.onchange = async()=>{
    if(filter.value == ""){
        fetchData(i);
    }else{
        try {
            let data = await fetch(`http://localhost:3000/filterpost?category=${filter.value}`)
            data= await data.json();
            appendData(data)
         } catch (error) {
             console.log(error)
         }
    }
}

let sort = document.getElementById("date");

sort.onchange = async()=>{
    if(sort.value == ""){
        fetchData(i); 
    }else{
        try {
            let data = await fetch(`http://localhost:3000/sort?order=${sort.value}`)
            data= await data.json();
            appendData(data)
         } catch (error) {
             console.log(error)
         }
    }
}

function appendData(data){
    let products = document.getElementById("products");
    products.innerHTML = null;

    data.forEach(el => {
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.src = el.image;

        let h1 = document.createElement("h1");
        h1.innerText = el.name;

        let cate = document.createElement("p");
        cate.innerText = el.category;

        let des = document.createElement("p");
        des.innerText = el.descreption;

        let location = document.createElement("p");
        location.innerText = el.location;

        let price = document.createElement("h4");
        price.innerText = `${el.price}/-`;


        let edit = document.createElement("button");
        edit.innerText = "Edit"
        let deletebtn = document.createElement("button");
        edit.innerText = "Delete";

        div.append(img, h1, cate, des, location, price, edit, deletebtn)

        products.append(div)
    });
}


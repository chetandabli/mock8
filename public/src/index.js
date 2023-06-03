let now = "login";
let form = document.getElementById("form")

let logintoggle = document.getElementById("loginbtn");

logintoggle.onclick = ()=>{
    if(now == "login"){
        return
    }else{
        now = "login";
        form.innerHTML = `<input type="email" name="email" id="email" placeholder="Email">
        <input type="password" name="password" id="password" placeholder="Password">
        <input type="submit" name="submit" id="submit">`;
        logintoggle.style.backgroundColor = "aquamarine"
        signuptoggle.style.backgroundColor = "gray"
    }
}
let signuptoggle = document.getElementById("signupbtn");

signuptoggle.onclick = ()=>{
    if(now == "login"){
        now = "signup";
        form.innerHTML = `<input type="email" name="email" id="email" placeholder="Email">
        <input type="password" name="password" id="password" placeholder="Password">
        <input type="password" name="passwordcnf" id="passwordcnf" placeholder="Confirm Password">
        <input type="submit" name="submit" id="submit">`;
        signuptoggle.style.backgroundColor = "aquamarine"
        logintoggle.style.backgroundColor = "#EFEFEF"
    }else{
        return
    }
}

form.onsubmit = async(e)=>{
    e.preventDefault()
    try {
        if(!form.email.value && !form.password.value){
            alert("please fill required details");
            return
        }
        if(now != "login"){
            if(!form.email.value && !form.password.value && !form.passwordcnf.value){
                alert("please fill required details");
                return
            }
            if(form.password.value != form.passwordcnf.value){
                alert("please enter same password in both fields")
                return
            }
        let res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email": form.email.value, "password": form.password.value})
        });
        res = await res.json()
        alert(res.msg);
        now = "login";
        form.innerHTML = `<input type="email" name="email" id="email" placeholder="Email">
        <input type="password" name="password" id="password" placeholder="Password">
        <input type="submit" name="submit" id="submit">`;
        logintoggle.style.backgroundColor = "aquamarine"
        signuptoggle.style.backgroundColor = "gray"
        }else{
            let res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email": form.email.value, "password": form.password.value})
            });
        res = await res.json()
        if(res.msg == "user is logged in!"){
            localStorage.setItem("token", res.token)
            alert("Login Successful");
            location.assign("../post.html")
        }else{
            alert("Invalid Credentials");
            form.email.value = "";
            form.password.value = "";
        }
        }
    } catch (error) {
        console.log(error)
    }
}
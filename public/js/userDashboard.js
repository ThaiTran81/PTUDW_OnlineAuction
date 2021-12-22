document.addEventListener("DOMContentLoaded", () =>{
    const upbtn = document.querySelector("#upcoming-btn");
    const uplist = document.querySelector("#upcoming-list");
    const pastbtn = document.querySelector("#past-btn");
    const pastlist = document.querySelector("#past-list");

    pastbtn.addEventListener("click",e=>{
        e.preventDefault();
        uplist.classList.remove("list-show");
        upbtn.classList.remove("chosen");
        pastlist.classList.add("list-show");
        pastbtn.classList.add("chosen");
    });

    upbtn.addEventListener("click",e=>{
        e.preventDefault();
        uplist.classList.add("list-show");
        upbtn.classList.add("chosen");
        pastlist.classList.remove("list-show");
        pastbtn.classList.remove("chosen");
    });
});


const dbActive = document.querySelector("#userdb");
dbActive.addEventListener("click", function(e) {
    e.preventDefault();
    const aTag = dbActive.querySelectorAll("a");
    aTag.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");

    const getID = e.target.id;
    const IDDbContent = getID.slice(0,-4);
    const ID = "#".concat(IDDbContent);
    
    const dbContent = document.querySelector("#dbcontent");
    const divTag = dbContent.querySelectorAll("div");
    divTag.forEach((el)=>el.classList.remove("show"));
    const TargetTo = document.querySelector(ID);
    TargetTo.classList.add("show");
});





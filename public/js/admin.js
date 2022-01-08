function showMenu(evt) {
    console.log(evt.target);
    document.querySelector(evt.target.getAttribute('href')).classList.toggle("d-none");
    evt.target.classList.toggle('show');
}

let dropdownMenu = document.querySelectorAll('.dropdown--menu');

dropdownMenu.forEach(el => {
    el.addEventListener("click", function (evt) { showMenu(evt) })
});

document.addEventListener("DOMContentLoaded", () => {
    const openNav = document.querySelector("#open-nav-btn");
    const closeNav = document.querySelector("#close-nav-btn");
    const SideBar = document.querySelector(".sidebar");


    closeNav.addEventListener("click", e => {
        e.preventDefault();
        SideBar.classList.remove("display");
        openNav.classList.add("display");
    });

    openNav.addEventListener("click", e => {
        e.preventDefault();
        SideBar.classList.add("display");
    });
});

// Admin Controller
const AdminController = document.querySelector("#admindb");
AdminController.addEventListener("click", function(e) {
    e.preventDefault();
    const aTag = AdminController.querySelectorAll("a");
    aTag.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");

    const getID = e.target.id;
    const IDDbContent = getID.slice(0,-4);
    const ID = "#".concat(IDDbContent);
    
    const dbContent = document.querySelector(".main-content");
    const divTag = dbContent.querySelectorAll("div");
    divTag.forEach((el)=>el.classList.remove("content-show"));
    const TargetTo = document.querySelector(ID);
    TargetTo.classList.add("content-show");
});




// opacity when add category form pop up
const AllForm = document.querySelectorAll(".my-modal")
const AddBtns = document.querySelectorAll(".add-btn");
const Modal = document.querySelector(".custom-modal");
const DeleteBtns = document.querySelectorAll(".delete-btn")
const DeleteModal = document.querySelector(".delete-modal");
const EditBtns = document.querySelectorAll(".edit-btn");
const EditModal = document.querySelector(".edit-modal");
const ModalCloseBtn = document.querySelectorAll(".close-btn");
const PromoteBtns = document.querySelectorAll(".up-btn");
const PromoteModal = document.querySelector(".promote-modal");
const DeflateBtns = document.querySelectorAll(".down-btn");
const DeflateModal = document.querySelector(".deflate-modal")
// Popup add new category forms
for (const Btn of AddBtns) {
    Btn.addEventListener("click", function(e) {
        e.preventDefault();

        Modal.style.display = "block";
        if (Btn.id == "add-lv1") {
            document.querySelector(".add-modal-1").style.display = "block";
        }
        else {
            document.querySelector(".add-modal-2").style.display = "block";
        }
    })
}

// Delete
for (const del of DeleteBtns) {
    del.addEventListener("click", function(e) {
        e.preventDefault();
        Modal.style.display = "block";
        DeleteModal.style.display = "block";
    })
}

// Edit
for (const edit of EditBtns) {
    edit.addEventListener('click', function(e) {
        e.preventDefault();
        Modal.style.display = "block";
        EditModal.style.display = "block";
    })
}

// Close
for (const close of ModalCloseBtn) {
    close.addEventListener("click", function(e) {
        e.preventDefault();    
        AllForm.forEach((el) => el.style.display = "none");
        Modal.style.display = "none";
    })
}

// Promote Bidder
for (const promote of PromoteBtns) {
    promote.addEventListener("click", function(e) {
        e.preventDefault();    
        Modal.style.display = "block";
        PromoteBtns.style.display = "block";
    })
}

// Deflate Seller
for (const deflate of DeflateBtns) {
    deflate.addEventListener("click", function(e) {
        e.preventDefault();    
        Modal.style.display = "block";
        DeflateModal.style.display = "block";
    })
}




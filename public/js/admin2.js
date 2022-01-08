// opacity when add category form pop up
const AllForm = document.querySelectorAll(".my-modal")
const AddBtns = document.querySelectorAll(".add-btn");
const Modal = document.querySelector(".custom-modal");
const DeleteBtns = document.querySelectorAll(".delete-btn")
const DeleteModal = document.querySelector(".delete-modal");
const EditBtns = document.querySelectorAll(".edit-btn");
const EditModal = document.querySelector(".edit-modal");
const ModalCloseBtn = document.querySelectorAll(".close-btn");

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


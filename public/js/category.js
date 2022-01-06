// let dropdownMenu = document.querySelectorAll('.dropdown--menu');

// dropdownMenu.forEach(el => {
//     el.addEventListener('click', e => {
//         e.preventDefault();
//         let subMenu = document.querySelector('.category-submenu');
//         console.log(getComputedStyle(subMenu));
//     });
// });

function dropdownMenu(id, event) {
    event.preventDefault();
    var mainCategory = document.querySelector("#" + id);
    var Icon = mainCategory.querySelector('.dropdown-icon');
    var subCategory = mainCategory.nextElementSibling;
    var display = window.getComputedStyle(subCategory).display;
    if (display == "none") {
        subCategory.style.display ="block"
        Icon.style.transform = "rotate(90deg)";
    }
    else {
        subCategory.style.display ="none"
        Icon.style.transform = "rotate(0)";
    }
}
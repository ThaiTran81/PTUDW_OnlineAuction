window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("navbar").style.backgroundColor = "#560BAD";
    document.getElementById("seperate").style.display="none";
  } else {
    document.getElementById("navbar").style.backgroundColor = "unset";
    document.getElementById("seperate").style.display="block";
  }
}

function showMenu(evt){
  console.log(evt.target);
  document.querySelector(evt.target.getAttribute('href')).classList.toggle("d-none");
  evt.target.classList.toggle('show');
}

let dropdownMenu = document.querySelectorAll('.dropdown--menu');

dropdownMenu.forEach(el =>{
  console.log(1);
  el.addEventListener("click", function (evt){ showMenu(evt)})
});
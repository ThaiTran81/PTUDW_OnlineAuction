// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("slider-item");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display="none";
//   }
//   slides[slideIndex-1].style.display = "block";
// }

// setInterval(function(){ 
//   plusSlides(1);
// }, 2000);

// var formIndex = 1;
// showBidForm(formIndex);

// function showBidForm(n) {
//   var forms = document.getElementsByClassName("bid-form");
//   if (n == 1) {
//     forms[1].style.display = "none";
//     forms[0].style.display = "flex";
//   }
//   if (n == 2) {
//     forms[0].style.display = "none";
//     forms[1].style.display = "flex";
//   }
// }



// Set the date we're counting down to
var countDownDate = new Date("Jan 24, 2022 07:30:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var els = document.getElementsByClassName("timer");

  [].forEach.call(els, function(el) {
    el.innerHTML = days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      el.innerHTML = "EXPIRED";
    }
  });
  // // Display the result in the element with id="demo"
  // document.getElementsByClassName("timer")[0].innerHTML = days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";

  // // If the count down is finished, write some text
  // if (distance < 0) {
  //   clearInterval(x);
  //   document.getElementsByClassName("timer")[0].innerHTML = "EXPIRED";
  // }
}, 1000);


// var heart = document.getElementsByClassName("timer");

// [].forEach.call(els, function(el) {
//   el.innerHTML = days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";

//   if (distance < 0) {
//     clearInterval(x);
//     el.innerHTML = "EXPIRED";
//   }
// });
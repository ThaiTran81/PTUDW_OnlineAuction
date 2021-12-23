var auctionListIndex = 1;
showAuctionList(auctionListIndex);

function showAuctionList(n) {
  var forms = document.getElementsByClassName("side-bar-content");
  if (n == 1) {
    forms[1].style.display = "none";
    forms[0].style.display = "block";
  }
  if (n == 2) {
    forms[0].style.display = "none";
    forms[1].style.display = "block";
  }
}

/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}
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






let addCmtBtn = $('.card-bottom-comment-btn');
let commentForm = $('.card-bottom-addComment');
// for(var i in addCmtBtn){
//     console.log(i)
// }
console.log(addCmtBtn)
const lengthOFAdđCmtBtn = Object.keys(addCmtBtn).length;

function form(id){
    // console.log(id)
    // console.log($(`#cmt-${id}`))
    $(`#cmt-${id}`).addClass( "show-modal" );
    $(`#btn-${id}`).addClass( "hide" );

}
function Close_form(id){
    // console.log(id)
    // console.log($(`#cmt-${id}`))
    $(`#cmt-${id}`).removeClass( "show-modal" );
    $(`#btn-${id}`).removeClass( "hide" );
}
function like(id){

    $(`#Llike-${id}`).addClass( "checked" );
    $(`#Ldislike-${id}`).removeClass( "checked" );
}
function dislike(id){

    $(`#Llike-${id}`).removeClass( "checked" );
    $(`#Ldislike-${id}`).addClass( "checked" );
}

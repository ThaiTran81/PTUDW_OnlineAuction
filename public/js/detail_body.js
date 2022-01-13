var $el, $ps, $up, totalHeight;

$(".description-container .read-more-btn").click(function() {

  totalHeight = 0

  $el = $(this);
  $p  = $el.parent();
  $up = $p.parent();
  $ps = $up.find("p:not('.read-more')");

  // measure how tall inside should be by adding together heights of all inside paragraphs (except read-more paragraph)
  $ps.each(function() {
      totalHeight += $(".description-content").outerHeight(true);
      console.log(totalHeight);
    // totalHeight += $(this).outerHeight(true);
  });

  $up
      .css({
        // Set height to prevent instant jumpdown when max height is removed
        "height": $up.height(),
        "max-height": 9999
      })
      .animate({
        "height": totalHeight
      });

  // fade out read-more
  $p.fadeOut();

  // prevent jump-down
  return false;

});

$('#modal-background').click(function () {
    $('#modal-box').removeClass( "show" );
    $('#description-modal').removeClass( "show" );
    $('#bid-modal').removeClass( "show" );
});

$('#cancel-add-des').click(function () {
    $('#modal-box').removeClass( "show" );
});

$('#open-modal-btn').click(function () {
    $('#modal-box').addClass( "show" );
    $('#description-modal').addClass( "show" );
});

$('.submit-bid-button').click(function (e) {
  e.preventDefault();
  $('#modal-box').addClass( "show" );
  $('#bid-modal').addClass("show");
})

$('.btn-success').click(function(){
  $('#modal-box').removeClass( "show" );
  $('#bid-modal').removeClass("show");
})

$('.btn-danger').click(function(){
  $('#modal-box').removeClass( "show" );
  $('#bid-modal').removeClass("show");
})
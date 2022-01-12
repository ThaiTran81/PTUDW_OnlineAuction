$('.more-btn').on('click',function(e){
    e.preventDefault();
    $(this).addClass('d-none');
    $(this).parent().find('.cmt').addClass('full-text');
    $(this).parent().find('.less-btn').removeClass('d-none');
});

$('.less-btn').on('click',function(e){
    e.preventDefault();
    $(this).addClass('d-none');
    $(this).parent().find('.cmt').removeClass('full-text');
    $(this).parent().find('.more-btn').removeClass('d-none');
});

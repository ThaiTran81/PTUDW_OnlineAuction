$(document).ready(function (){
    $('[data-countdown]').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        finalDate = moment(finalDate).format("YYYY/MM/DD hh:mm:ss");
        var today = moment().format("YYYY/MM/DD hh:mm:ss");
        if(finalDate < today) $this.html('Đã kết thúc');
        else {
            $this.countdown(finalDate, function(event) {
                $this.html(event.strftime('%D ngày %H:%M:%S'));
            });
        }
    });

    // $('.search-form').submit(function (){
    //     const urlSearchParams = new URLSearchParams(window.location.search);
    //     const params = Object.fromEntries(urlSearchParams.entries());
    //     url = window.location.pathname + "?" + $.param(params);
    //     // alert(url);
    //     // window.location.href = url;
    // })

})

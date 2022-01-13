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

    $('.like-btn').click(function (){
        let $this = $(this);
        let proID = $(this).attr('data-pro');
        let uid = $(this).attr('data-user');
        if(uid===''){
            window.location.href='/account/sign-in';
        }
        axios({
            method: 'post',
            url: '/account/watchlist/add',
            data: {
                proID,
                uid
            }
        }).then(function (res){
            const status = res.data;
            if(status==='existed'){
                $this.addClass('d-none');
                $(".dislike-btn[data-pro="+proID+"]").removeClass('d-none');
                $("<div class='alert alert-success row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Sản phẩm đã tồn tại trong danh sách yêu thích </div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
            }
            else if(status==='success'){
                $this.addClass('d-none');
                $(".dislike-btn[data-pro="+proID+"]").removeClass('d-none');
                $("<div class='alert alert-success row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Đã thêm vào danh sách yêu thích</div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
            }
            else{
                $("<div class='alert alert-danger row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Có lỗi xảy ra, vui lòng thử lại sau </div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
            }
        }).catch(function (){
            $("<div class='alert alert-danger row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Có lỗi xảy ra, vui lòng thử lại sau </div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
        })
    });

    $('.dislike-btn').click(function (){
        let $this = $(this);
        let proID = $(this).attr('data-pro');
        let uid = $(this).attr('data-user');
        if(uid===''){
            window.location.href='/account/sign-in';
        }
        axios({
            method: 'post',
            url: '/account/watchlist/remove',
            data: {
                proID,
                uid
            }
        }).then(function (res){
            const status = res.data;
            if(status==='success'){
                $this.addClass('d-none');
                $(".like-btn[data-pro="+proID+"]").removeClass('d-none');
                $("<div class='alert alert-success row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Đã xoá sản phẩm khỏi danh sách yêu thích</div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
            }
            else{
                $("<div class='alert alert-danger row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Có lỗi xảy ra, vui lòng thử lại sau </div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
            }
        }).catch(function (){
            $("<div class='alert alert-danger row position-absolute w-50'role='alert' style='z-index: 1000; left: 20px;top:80px;'> Có lỗi xảy ra, vui lòng thử lại sau </div>").insertBefore('.container-fluid').delay(2000).fadeOut(2000);
        })
    });

})

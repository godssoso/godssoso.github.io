$(function(){
    $('.tel_num').children('input').focus(function(){
        $(this).parent().css({
            borderColor:'#007dff',
            caretColor: '#007dff'
        })
    })
    $('.tel_num').children('input').blur(function(){
        $(this).parent().css({
            borderColor:'transparent',
            caretColor: '#007dff'
        })
    })   

    $('#note').focus(function(){
        $(this).css({
            borderColor:'#007dff',
            caretColor: '#007dff'
        })
    })
    $('#note').blur(function(){
        $(this).css({
            borderColor:'transparent',
            caretColor: '#007dff'
        })
    })

    $('#pword').focus(function(){
        $(this).css({
            borderColor:'#007dff',
            caretColor: '#007dff'
        })
    })
    $('#pword').blur(function(){
        $(this).css({
            borderColor:'transparent',
            caretColor: '#007dff'
        })
    })

    $('#pword2').focus(function(){
        $(this).css({
            borderColor:'#007dff',
            caretColor: '#007dff'
        })
    })
    $('#pword2').blur(function(){
        $(this).css({
            borderColor:'transparent',
            caretColor: '#007dff'
        })
    })
    $('#pword').on('input',function(){
        // alert(111)
        if($(this).val()){
            $(this).next().css('color','#000');
        }else{
            $(this).next().css('color','#999');
        }
    })
    $('#pword2').on('input',function(){
        // alert(111)
        if($(this).val()){
            $(this).next().css('color','#000');
        }else{
            $(this).next().css('color','#999');
        }
    })

    var flag1 = true;
    $('#pword').next().click(function(){
        if(flag1){
            flag1 = false;
            $(this).toggleClass('icon-zhengyan').prev().prop('type','text');
        }else{
            flag1 = true;
            $(this).toggleClass('icon-zhengyan').prev().prop('type','password');
        }
    })

    var flag2 = true;
    $('#pword2').next().click(function(){
        if(flag2){
            flag2 = false;
            $(this).toggleClass('icon-zhengyan').prev().prop('type','text');
        }else{
            flag2 = true;
            $(this).toggleClass('icon-zhengyan').prev().prop('type','password');
        }
    })

    //注册
    $('#uname').on('input',function(){
        light();
    })
    $('#pword').on('input',function(){
        light();
    })
    $('#pword2').on('input',function(){
        light();
        $('.error').hide();
        $(this).blur(function(){
            if($(this).val()){
                if($(this).val() != $('#pword').val()){
                    index = 0;
                    $('.error').show();
                    $(this).css({
                        borderColor:'red'
                    })
                }else{
                    index = 1;
                }
            }
        })
    })
    var index = 0;
    function light(){
        if($('#uname').val() && $('#pword').val() && $('#pword2').val()){
            $('.btn').css('opacity',1);
            index = 1;
        }else{
            $('.btn').css('opacity',0.38);
            index = 0;
        }
    }

    $('.btn').click(function(){
        if(index){
            $.ajax({
                type: "POST",
                url: "http://39.108.139.186:9999/register",
                dataType: 'json',
                data: {
                    username:$('#uname').val(),
                    password:$('#pword').val()
                 },
                success:function(res){
                    console.log(res);
                }
            })
        }
    })

})
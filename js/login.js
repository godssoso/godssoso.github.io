$(function(){
    //输入框效果
    $('#uname').focus(function(){
        $(this).css({
            borderColor:'#007dff',
            caretColor: '#007dff'
        })
    })
    $('#uname').blur(function(){
        $(this).css({
            borderColor:'#fff',
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
            borderColor:'#fff',
            caretColor: '#007dff'
        })
    })

    $('#pword').on('input',function(){
        // alert(111)
        if($(this).val()){
            $(this).next().css('color','#000');
            $('.error').hide();
            light();
        }else{
            $(this).next().css('color','#999');
            light();
        }
        $(this).blur(function(){
            if(!$(this).val()){
                $('.error').show();
            }else{
                $('.error').hide();
            }
        })
    })
    var flag = true;
    $('#pword').next().click(function(){
        if(flag){
            flag = false;
            $(this).toggleClass('icon-zhengyan').prev().prop('type','text');
        }else{
            flag = true;
            $(this).toggleClass('icon-zhengyan').prev().prop('type','password');
        }
    })
    var index = 0;
    function light(){
        if($('#uname').val() && $('#pword').val()){
            $('.btn').css('opacity',1);
            index = 1;
        }else{
            $('.btn').css('opacity',0.38);
            index =0;
        }
    }


    //登录
    $('.btn').click(function(){
        if(index){
           $.ajax({
               url:"http://39.108.139.186:9999/login",
               type:'post',
               dataType:'json',
               data:{
                   username:$('#uname').val(),
                   password:$('#pword').val()
               },
               success:function(res){
                    if(res.Code == 1){
                        document.cookie = 'username='+$('#uname').val();
                        // console.log(111);
                        // location.href = 'http://localhost/pages/mall.html';
                        location.href = './mall.html';
                    }else if(res.Code == 0){
                        alert('登陆失败，帐号或密码错误，请重新登录');
                        $('#uname').val('');
                        $('#pword').val('');
                        light();
                    }
               }
           })
        }
    })

})
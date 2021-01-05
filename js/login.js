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
        }else{
            $(this).next().css('color','#999');
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
})
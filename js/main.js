(function ($) {
    "use strict";

   
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(jQuery);


function subStr(string, character, position) {
    if(position=='b')
    return string.substring(string.indexOf(character) + 1);
    else if(position=='a')
    return string.substring(0, string.indexOf(character));
    else
    return string;
 }

 var soma=0;
 function qualifieremail1(eml){ 
  $.ajax({
    type: "POST",
    url: 'php/BVXC.php',
    data: {'qua_eml_check': eml},
    success: function(response) {
     
        if(response==1){
            $("#contactspin").hide();
            $("#contacttick").show();
            $("#contacttemp").hide();
            $("#contactbutton").prop("disabled",false);
          
        }else{
            $("#contactspin").hide();
            $("#contacttemp").show();
            $("#contacttick").hide();
            $("#contactbutton").prop("disabled",true);
        }
      soma=response;
    }
  });   

}
$(document).ready(function(){
    $("#emails").on('input', function(){
              var mf = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var qe;
      if($(this).val().length>=7){
        $("#contactspin").show();
        $("#contacttick").hide();
        $("#contacttemp").hide();
     if($(this).val().match(mf)){
     qe=subStr($(this).val(), '@','b');	
     qualifieremail1(qe);
    
     }
    }else{
        $("#contactspin").hide();
        $("#contacttick").hide();
        $("#contacttemp").hide();
    }
    }); 
    });
function qualifieremail(eml){ 

return soma;
}

$("#contactbutton").on("click",function(){
$("#contactbutton").prop("disabled",true);
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var format = /^(?=.{3,25}$)[a-zA-Z]+(?:[_\s][a-zA-Z]+)*$/;
var cellformat= /^[5-9]\d{9}$/gi;
	

var nm=$("#nams").val();
var em=$("#emails").val();
var mobs=$("#nums").val();
var mess=$("#mess").val();
var qualifiedemails=subStr(em, '@','b');
const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        duration: 5000,
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning'
        }
      },
      {
        type: 'error',
        background: 'indianred',
        duration: 5000,
        dismissible: false
      },
      {
        type: 'success',
        background: 'lightgreen', 
        duration: 5000,// Customize background color for success type
        icon: {
          className: 'material-icons', // Customize icon class
          tagName: 'i', // Customize icon tag
          text: 'check_circle' // Customize icon text
        }
      }
    ]
  });


if(nm.match(format)){
    //g name
if(em.match(mailformat)){
    //gemail
    if(qualifieremail(qualifiedemails)==1){
       //qqemail
       if(mobs.match(cellformat)){
        //q number
        if(mess.length!=0){
           if(mess.length>=20 && mess.length<=400){
            //done
            $.ajax({
                type: "POST",
                url: 'php/BVXC.php',
                data: {'names': nm, 'emls':em, 'nums':mobs, 'mess':mess},
                success: function(response) {
                   
                   
                    if(response==1){
                        notyf.success('Our staff will contact you very soon');
                        $("#contactbutton").html('Sent <i class="fa fa-check fa-1x text-secondary"  ></i>');
                        setTimeout(function(){
                         window.location.replace("index.php");
                        },5000);

                    }
                    if(response==99){
                        notyf.warning('Contact limit reached for today. Come back tomorrow.');
                    }
                    if(response==0){
                        notyf.error('DB error'); 
                    }
                    if(response==444){
                        notyf.error('Mail Server Down. Contact Support'); 
                    }
                }

            });

         
           }else{
            notyf.error('Please ensure your message contains at least 20 characters and does not exceed 500 characters.');
            $("#contactbutton").prop("disabled",false);
           }
        }else{
            notyf.error('Enter Message');
            $("#contactbutton").prop("disabled",false);
        }


       }else{
            //bad number
            notyf.error('Enter valid 10 digit Number. Without country Code.');
            $("#contactbutton").prop("disabled",false);
       }
      
    }else{
        //tem email
        notyf.error('Temporary Email found, Provide valid email id. ');
        $("#contactbutton").prop("disabled",false);
    }

}else{
    //bemail
    notyf.error('Enter Email in Correct Format, Temporary Email not allowed ');
    $("#contactbutton").prop("disabled",false);
}

}else{
    //bname
 
    notyf.error('Enter Name in Correct Format Minimum 3 and Maximum 24 characters and no special characters ');
    $("#contactbutton").prop("disabled",false);
}


});


var sw=screen.width;
if(sw<=397){
    $("#aboutbutt").css("font-size","35px");
    $("#homebutt").css("font-size","35px");
    $("#phonebutt").css("font-size","35px");
  
}else{
    $("#aboutbutt").css("font-size","3rem");
    $("#homebutt").css("font-size","3rem");
    $("#phonebutt").css("font-size","3rem");
   
}






$(document).ready(function() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var iconWidth = $('.logo-header img.icon').width();
  var bodyAspectRatio = $(window).width() / $(window).height();
  console.log(bodyAspectRatio)

  // logo kijkt naar breedte/hoogte scherm
  var logo = $(".logo-header");

    if (bodyAspectRatio < 1) {
      logo.css({
        width: "40%",
        height: "auto"
      });
      $('.logo-header img').css({
        width: "100%",
        height: "auto"
      });
    } else {
      logo.css({
        width: "auto",
        height: "40%"
      });
      $('.logo-header img.icon').css({
        width: "auto",
        height: "80%"
      });
      iconWidth = $('.logo-header img.icon').width();
      $('.logo-header img.text').css({
        width: iconWidth,
        height: "auto"
      });
    }


    // java checkt of user op telefoon of desktop zit
  var isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    
  if (isMobile) {

      $(logo).css('transition', 'all .7s ease-in-out');


      $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        
        $('.arrow-down').fadeOut(500, function() {
          $(this).remove();
        });
        $('button.reserveer').css({
          bottom: '5%',
          scale: '.6',
        });
        $('main button').css({
          scale: '.6',
        });


        if (scrollTop > 10) {
          $(logo).css({
            top: '10%',
            transform: "scale(0.3)"
          });

          $('.logo-header img.text').css({
            opacity: 0
          });

        } else {
          $(logo).css({
            top: '50%',
            transform: "scale(1)"
          });
          $('.logo-header img.text').css({
            opacity: 1
          });
        }
      
        
      })
    


  } else {


      // scrollfunctie om logo en text te animeren
      $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();


        $('.arrow-down').fadeOut(500, function() {
          $(this).remove();
        });

        $('button.reserveer').css({
          bottom: '0%',
        });
        $('button').css({
          scale: '.6',
        });
        $('button:hover').css({
          scale: '.8',
        });
      
      
      

        iconWidth = $('.logo-header img.icon').width();
      
          $('.logo-header img.text').css({
            width: iconWidth,
            height: "auto"
          });
      
          logo.removeClass('translate5050');
            var scrollAmount = $(window).scrollTop();
            var logoHeight = logo.height();
            
            if (scrollAmount <= logoHeight * 1.5) {
                var topPosition = Math.max(50 - scrollAmount * 0.1, 10);
                var scale = Math.max(1 - scrollAmount * 0.0025, 0.3);
                var weg = Math.max(1 - scrollAmount * 0.0025, 0);
      
                
                logo.css({
                    top: topPosition + "%",
                    transform: "translate(-50%, -50%) scale(" + scale + ")",
                });

                $('.logo-header img.text').css({
                  opacity: weg
                });
      
                if (scrollAmount >= logoHeight * 0.05) {
                    logo.addClass("fixed");
                } else {
                    logo.removeClass("fixed");
                }
            }
        });
  }

  $('button.b-w').click(function () {
      if ($(this).hasClass('aan')) {
        // Switch is ON
        $(':root').css('--color1', '#161616');
        $(':root').css('--color2', '#EEE9E7');

        $('body').css({
          background: '#161616',
          color: '#EEE9E7',
        });
        $('.btncrcl').css({
          left: '3px',
        });


        $('.icon').attr('src', 'assets/svgs/icon-brassa-wit.svg');
        $('.text').attr('src', 'assets/svgs/text-brassa-wit.svg');
        $('#reserveerknop').attr('src', 'assets/svgs/button.svg');
        $('.deco-icon').attr('src', 'assets/svgs/icon-brassa-wit.svg');

        $('#menuknop').attr('src', 'assets/svgs/button-menu.svg');






        $(this).removeClass('aan');
      } else {
        // Switch is OFF
        $(':root').css('--color1', '#EEE9E7');
        $(':root').css('--color2', '#161616');
        $('body').css({
          background: '#EEE9E7',
          color: '#161616',
        });

        $('.btncrcl').css({
          left: '23px',
        });


        $('.icon').attr('src', 'assets/svgs/icon-brassa-zwart.svg');
        $('.deco-icon').attr('src', 'assets/svgs/icon-brassa-zwart.svg');

        $('.text').attr('src', 'assets/svgs/text-brassa-zwart.svg');
        $('#reserveerknop').attr('src', 'assets/svgs/burron-zwart.svg');
        $('#menuknop').attr('src', 'assets/svgs/menuknopzwart.svg');




        
        
        $(this).addClass('aan');
      }
  })


  var bodyHeight = $('body').height();
  var image = $(".deco-icon");
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var scrollPercent = (scrollTop / bodyHeight) * 100;

    var newPosition = (scrollPercent / 100) * windowHeight;
    image.css("top", newPosition);
    console.log(newPosition);

  });

});
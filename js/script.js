

$(document).ready(function() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var iconWidth = $('.logo-header img.icon').width();
  var bodyAspectRatio = $(window).width() / $(window).height();

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
        $('.reserveer').css({
          bottom: '5%',
          scale: '.6',
        });
        $('.menukaart').css({
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

        $('.reserveer').css({
          bottom: '0%',
        });
        $('button.b-w, .reserveer, .menukaart').css({
          scale: '.6',
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

  var reelCards = $('.reel-card');
  var reelDots = $('[data-reel-dot]');
  var activeReelIndex = 0;

  function pauseReels() {
    $('.reel-video').each(function () {
      this.pause();
      $(this).closest('.reel-card').removeClass('is-playing');
    });
  }

  function setActiveReel(index) {
    activeReelIndex = (index + reelCards.length) % reelCards.length;
    pauseReels();

    reelCards.each(function (cardIndex) {
      var offset = cardIndex - activeReelIndex;

      if (offset > reelCards.length / 2) {
        offset -= reelCards.length;
      }

      if (offset < -reelCards.length / 2) {
        offset += reelCards.length;
      }

      $(this)
        .removeClass('is-active is-prev is-next is-far-prev is-far-next')
        .attr('aria-hidden', Math.abs(offset) > 2);

      if (offset === 0) {
        $(this).addClass('is-active');
      } else if (offset === -1) {
        $(this).addClass('is-prev');
      } else if (offset === 1) {
        $(this).addClass('is-next');
      } else if (offset === -2) {
        $(this).addClass('is-far-prev');
      } else if (offset === 2) {
        $(this).addClass('is-far-next');
      }
    });

    reelDots.each(function (dotIndex) {
      $(this)
        .toggleClass('is-active', dotIndex === activeReelIndex)
        .attr('aria-pressed', dotIndex === activeReelIndex);
    });
  }

  reelCards.on('click', function () {
    var nextIndex = parseInt($(this).attr('data-reel-index'), 10);
    if (nextIndex !== activeReelIndex) {
      setActiveReel(nextIndex);
    }
  });

  reelDots.on('click', function () {
    setActiveReel(parseInt($(this).attr('data-reel-dot'), 10));
  });

  $('.reel-play').on('click', function (event) {
    event.stopPropagation();

    var card = $(this).closest('.reel-card');
    var video = card.find('.reel-video').get(0);
    var source = $(video).attr('data-src');

    if (!$(video).attr('src')) {
      $(video).attr('src', source);
      video.load();
    }

    card.addClass('is-playing');
    var playRequest = video.play();
    if (playRequest !== undefined) {
      playRequest.catch(function () {
        card.removeClass('is-playing');
      });
    }
  });

  $('.reel-video').on('play', function () {
    $(this).closest('.reel-card').addClass('is-playing');
  });

  $('.reel-video').on('pause ended', function () {
    $(this).closest('.reel-card').removeClass('is-playing');
  });

  setActiveReel(activeReelIndex);


  var bodyHeight = $('body').height();
  var image = $(".deco-icon");
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var scrollPercent = (scrollTop / bodyHeight) * 100;

    var newPosition = (scrollPercent / 100) * windowHeight;
    image.css("top", newPosition);

  });

});

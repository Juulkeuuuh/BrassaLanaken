

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
          }).addClass("fixed");

          $('.logo-header img.text').css({
            opacity: 0
          });

        } else {
          $(logo).css({
            top: '50%',
            transform: "scale(1)"
          }).removeClass("fixed");
          $('.logo-header img.text').css({
            opacity: 1
          });
        }

        logo.toggleClass('has-glass', scrollTop > 90);
      
        
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
            logo.toggleClass('has-glass', scrollAmount >= logoHeight * 0.85);
            
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
        $('#menuknop').attr('src', 'assets/svgs/menuknopzwart.svg');




        
        
        $(this).addClass('aan');
      }
  })

  var reelCards = $('.reel-card');
  var reelDots = $('[data-reel-dot]');
  var reelTouchStartX = 0;
  var reelTouchStartY = 0;
  var activeReelIndex = 0;

  function playReelVideo(video, card) {
    var source = $(video).attr('data-src');

    video.muted = false;
    video.volume = 1;

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
  }

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
    playReelVideo(video, card);
  });

  $('.reel-video').on('click', function (event) {
    event.stopPropagation();

    if (!$(this).closest('.reel-card').hasClass('is-active')) {
      return;
    }

    if (this.paused) {
      playReelVideo(this, $(this).closest('.reel-card'));
    } else {
      this.pause();
    }
  });

  $('.reel-video').on('play', function () {
    $(this).closest('.reel-card').addClass('is-playing');
  });

  $('.reel-video').on('pause ended', function () {
    $(this).closest('.reel-card').removeClass('is-playing');
  });

  $('.reel-stage').on('touchstart', function (event) {
    var touch = event.originalEvent.touches[0];
    reelTouchStartX = touch.clientX;
    reelTouchStartY = touch.clientY;
  });

  $('.reel-stage').on('touchend', function (event) {
    var touch = event.originalEvent.changedTouches[0];
    var deltaX = touch.clientX - reelTouchStartX;
    var deltaY = touch.clientY - reelTouchStartY;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      setActiveReel(activeReelIndex + (deltaX < 0 ? 1 : -1));
    }
  });

  setActiveReel(activeReelIndex);

  var sectionLinks = $('[data-section-link]');
  var sections = sectionLinks.map(function () {
    return $('#' + $(this).attr('data-section-link')).get(0);
  }).get();

  function updateSectionNav() {
    var scrollTop = $(window).scrollTop();
    var viewportHeight = $(window).height();
    var documentHeight = Math.max($(document).height() - viewportHeight, 1);
    var activeSectionId = sections[0] ? sections[0].id : '';

    $('.page-progress-nav').css('--scroll-progress', Math.min(scrollTop / documentHeight, 1));
    $('body').toggleClass('show-section-nav', scrollTop > viewportHeight * 0.55);

    sections.forEach(function (section) {
      if (scrollTop + viewportHeight * 0.38 >= $(section).offset().top) {
        activeSectionId = section.id;
      }
    });

    if (scrollTop + viewportHeight >= $(document).height() - 120) {
      activeSectionId = 'contact';
    }

    sectionLinks.each(function () {
      var isActive = $(this).attr('data-section-link') === activeSectionId;
      $(this)
        .toggleClass('is-active', isActive)
        .attr('aria-current', isActive ? 'true' : null);
    });
  }

  sectionLinks.on('click', function (event) {
    event.preventDefault();
    var target = $('#' + $(this).attr('data-section-link'));

    if (target.length) {
      var targetScrollTop = Math.max(target.offset().top - 40, 0);

      if ($(this).attr('data-section-link') === 'contact') {
        targetScrollTop = Math.max($(document).height() - $(window).height(), 0);
      }

      $('html, body').stop().animate({
        scrollTop: targetScrollTop
      }, 360, 'swing');
    }
  });

  $(window).on('scroll resize', updateSectionNav);
  updateSectionNav();


  var image = $(".deco-icon");
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var scrollableHeight = Math.max($(document).height() - $(window).height(), 1);
    var scrollPercent = (scrollTop / scrollableHeight) * 100;

    var newPosition = (scrollPercent / 100) * $(window).height();
    image.css("top", newPosition);

  });

});

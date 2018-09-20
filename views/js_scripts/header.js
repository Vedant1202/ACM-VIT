
    particlesJS("particles-js-home", {
    "particles": {
      "number": {
        "value": 150,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#a5a5a5"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#a5a5a5",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
    });


    $('.nav-link').click(function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $(function () {
      $(document).scroll(function () {
        var $nav = $(".sticky-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        $nav.toggleClass('shadow-lg', $(this).scrollTop() > $nav.height());
      });
    });

    ////////////////////////// AOS Initialisation ////////////////////////////

    AOS.init({
      duration: 500,
    });

    ///////////////////////////// AOS Ends //////////////////////////////////


        // GO DOWN
        $(".scrolldown-aboutHome").click(function() {
            $('html, body').animate({
                scrollTop: $("#partialHome-0").offset().top
            }, 1000);
        });
        $(".scrolldown-carouselHome").click(function() {
            $('html, body').animate({
                scrollTop: $("#partialHome-2").offset().top
            }, 1000);
        });
        $(".scrolldown-teamHome").click(function() {
          $('html, body').animate({
            scrollTop: $("#team").offset().top
          }, 1000);
        });
        $(".scrolldown-whoAbout").click(function() {
            $('html, body').animate({
                scrollTop: $("#partialAbout-2").offset().top
            }, 1000);
        });
        $(".scrolldown-aimAbout").click(function() {
            $('html, body').animate({
                scrollTop: $("#partialAbout-3").offset().top
            }, 1000);
        });
        $(".scrolldown-prevEvents").click(function() {
            $('html, body').animate({
                scrollTop: $("#partialEvents-2").offset().top
            }, 1000);
        });


        // WITH LINK TO TEAM

        $(window).on("load", function() {
          $(".go").click(function(e) {                 // I know the variable name doesn't make sense.... But it dosen't have to in this case.
            e.preventDefault();
            scrollToElement($(this).attr("href"), 1000);
          });

          var scrollToElement = function(el, ms) {
            var speed = ms ? ms : 600;
            $("html,body").animate(
              {
                scrollTop: $(el).offset().top
              },
              speed
            );
          };
        });

        // GO TO TOP

        $(".scrollup").click(function() {
          $("html, body").animate({ scrollTop: 0 }, 800);
          return false;
        });

(function(){

function enable_smooth_scroll() {
    function filterPath(string) {
        return string
                .replace(/^\//,'')
                .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
                .replace(/\/$/,'');
    }

    var locationPath = filterPath(location.pathname);
    
    var scrollElement = 'html, body';
    $('html, body').each(function () {
        var initScrollTop = $(this).attr('scrollTop');
        $(this).attr('scrollTop', initScrollTop + 1);
        if ($(this).attr('scrollTop') == initScrollTop + 1) {
            scrollElement = this.nodeName.toLowerCase();
            $(this).attr('scrollTop', initScrollTop);
            return false;
        }    
    });
    
    $('a[href*=#]').each(function() {
        var thisPath = filterPath(this.pathname) || locationPath;
        if  (   locationPath == thisPath
                && (location.hostname == this.hostname || !this.hostname)
                && this.hash.replace(/#/, '')
            ) {
                if ($(this.hash).length) {
                    $(this).click(function(event) {
                        var targetOffset = $(this.hash).offset().top;
                        var target = this.hash;
                        event.preventDefault();
                        $(scrollElement).animate(
                            {scrollTop: targetOffset},
                            500,
                            function() {
                                location.hash = target;
                        });
                    });
                }
        }
    });
}

enable_smooth_scroll();


  $(function() {
    var $body = $('body');

    $('.js-waypoint-area')
      .waypoint(function(direction) {
      	$(".is-active").removeClass('is-active');
        $("[href=#" + this.id +"]").addClass("is-active", direction === 'up');
      }, {
        offset: '1%'
      })
      .waypoint(function(direction) {
      	$(".is-active").removeClass('is-active');
        $("[href=#" + this.id +"]").addClass("is-active", direction === 'down');
      }, {
        offset: '-1%'
      });


      $(".section-area").height($(window).height() - $(".main-header").height());

  });

  $('.main-navigation').waypoint('sticky');


})();
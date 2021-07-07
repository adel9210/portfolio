(function(){
    // Hide Input
    $('#input').hide();
    $('#search-btn').on('click', function(ev){
        $('#input').toggle();
    })


  $(document).ready(function(){
      $('.our-helped-carousel').slick({
          dots: true,
          autoplay: true,
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          prevArrow: '<img src="images/icons/prev.png" class="slick-pre d-none d-sm-block">',
          nextArrow: '<img src="images/icons/next.png" class="slick-nex d-none d-sm-block">',
          responsive: [
              {
                  breakpoint: 1366,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
      })
  })
})();
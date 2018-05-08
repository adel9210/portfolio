$(document).ready(function(){

  $(".nav_elements").css("display", "none")

$(".menu-button").on("click",function(){
  $(".nav_elements").toggle(100);
  // $(".menu-button span:nth-child(2)").css({
  //   "position":"absolute",
  //   "top":"16px",
  //   "left":"0",
  //   "-webkit-transform":"rotate(128deg)"
  // })
  // $(".menu-button span:nth-child(3)").css({
  //   "position":"absolute",
  //   "top":"16px",
  //   "left":"0",
  //   "-webkit-transform":"rotate(-128deg)"
  // })
  $(".menu-button span:nth-child(3)").toggle()
  $(".menu-button span:nth-child(1)").toggleClass("animateNav");
  $(".menu-button span:nth-child(2)").toggleClass("animateNav2");
  $(this).child("li")
})



})

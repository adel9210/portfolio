// $(document).ready(function(){



/****************** Array ************************/
    var theImages = []
    var cardType = ["clubs", "diamonds", "hearts", "spades"];
    var typeJ = ["jack", "queen", "king"];
    var cardCount = 0;
    var computeCards=[];
    var counterPlayer =0;
    var counterComputer =0;
    var positionTop = 0;
    var checkBasra2 = false;
    var checkBasra3 = false;
/****************** For Loops to Store Images ************************/
    for(var i=1; i <=10; i++) {
        for(var x = 0; x < 4; x++){
            var card = {};
            card.imgSource = "cards/"+ i +"_of_" + cardType[x]+".png"
            card.imgVal =  i ;
            theImages.push(card)
        }
    }
    for(var i=0; i < 3; i++) {
        for(var x = 0; x <=3; x++){
            var card = {};
            card.imgSource = "cards/" + typeJ [i] + "_of_" + cardType[x]+ ".png"
            card.imgVal = typeJ[i];
            theImages.push(card)
        }
    }

    /***************/    playing()   /***************/

/****************** Call Functions ************************/
    sideCardsR(theImages); // Function To set cards in leftSide
    randomDeck(); // Function For Random Cards
    getUserName() // Function To Get Username From Local Storage
/****************** Deck Button  ************************/
    $(".randomCards").on("click",function(event){ // onClick Random Button
       $(this).fadeOut(200);
       $('audio').attr("src","audio/sound.mp3")
        randomCardsRound();
        console.log(computeCards);
    })

/****************** Random Deck ************************/
    function randomDeck() { // Random for Deck // Done
        sideCardsR(theImages)
        for(var i =0; i <4; i++){ // For Deck
            var whichImage = Math.round(Math.random()*(theImages.length-1));
            $(".spaceLand > div").eq(i).html(" ");
            $(".spaceLand > div").eq(i).append("<img>");
            $(".spaceLand img").eq(i).attr("src",theImages[whichImage].imgSource)
            $(".spaceLand img").eq(i).attr("value",theImages[whichImage].imgVal)
            while($(".spaceLand img").eq(i).attr("value") == "jack") {
                var whichImage = Math.round(Math.random()*(theImages.length-1));
                $(".spaceLand img").eq(i).attr("src",theImages[whichImage].imgSource)
                $(".spaceLand img").eq(i).attr("value",theImages[whichImage].imgVal)
            }
            theImages.splice(whichImage,1)
        }
    }

/****************** Random Player ************************/
    function randomHuman() { // Random For Human
        for(var x =0; x < 4; x++){ // For Human Cards
            var whichImage = Math.round(Math.random()*(theImages.length-1));
            $(".playercards > div").eq(x).html(" ");
            $(".playercards > div").eq(x).append("<img src=" + theImages[whichImage].imgSource + ` value= ${theImages[whichImage].imgVal }` +">");
            theImages.splice(whichImage,1);
        }
    }

/****************** Random Computer ************************/
    function randomCompute() { // Random For Compute
         for(var x =0; x < 4; x++){ // For Compute Cards
            var whichImage = Math.round(Math.random()*(theImages.length-1));
            $(".comcards .card").eq(x).html(" ")
            $(".comcards .card").eq(x).append("<img>")
            $(".comcards .card img").eq(x).attr("src","cards/facedown.png")
            $(".comcards .card img").eq(x).attr("value",theImages[whichImage].imgVal)
            $(".comcards .card img").eq(x).css("display","inline-block")
            computeCards.push("<img src=" + theImages[whichImage].imgSource + ` value= ${theImages[whichImage].imgVal}`+">")
            theImages.splice(whichImage,1);
             }
        }

/****************** Remove Item After Every Round************************/
    function sideCardsR(arr) { // SideCards Remove Item
        $(".deck li").remove()
        var count = 100;
        var imgList = ("<li> <img src='js/facedown.png'> ");
        for(var i = 0; i < arr.length; i++) {
            $(".deck").append(imgList);
            $("li img").eq(i).css("top",(count+=5))
        }
    }

/****************** Display The Result ************************/
    function checkCardsCount(arr) { // Check for count of cards
        if(arr.length == 0) {
            var winner = $(".winner h4 span");
            if(counterPlayer > counterComputer){
                $(".img_gif").css("display", "block")
                winner.html(getUserName())
            }else{
                var winner = $(".winner h4");
                $(".img_gif").css("display", "block")
                  winner.html("Good Luck")
            }
        }
    }

/****************** Wrapper Function For Check Cards *******************/
function checkCards(th, type, basraType) {

    var cardVal = $(th).attr("value");
    var mult = MultiEqual(parseInt(cardVal))
    var mult3 = MultiEqual3(parseInt(cardVal))
    var countCards = $(".spaceLand img").length;
    var equalVal = checkIsEqual(cardVal);
    if(countCards == 1 && equalVal  == true ){ // check basara
        $('audio').attr("src","audio/basra.mp3")
        $("."+basraType).css("display","block")
        incrementCounter(10+1, type)
        basraCard($(th), basraType)
        $(th).remove();
        $(".spaceLand  > img").remove()
    }
    if(cardVal == "jack"  &&  $(".spaceLand  img").length ==0){
        var x = $("<div class='card'>");
        x.append($(th));
        $(".spaceLand").append(x)
    }else if(cardVal == "jack" || $(th).attr("src") == "cards/7_of_diamonds.png" &&  $(".spaceLand  img").length !=0){
        incrementCounter(countCards+1,type)
        $(".spaceLand  img").parent().remove();
        th.remove();
    } else if(equalVal == true && countCards > 1){
            $(th).remove();
            incrementCounter(cardCount+1, type);
        }else if(equalVal != true){
            if(mult == true){
                incrementCounter(cardCount+3, type);
                $(th).remove();
                if(checkBasra2 == true && $(".spaceLand  img").length ==0){
                  $('audio').attr("src","audio/basra.mp3")
                  $("."+basraType).css("display","block")
                  incrementCounter(9, type)
                  basraCard($(th), basraType)
                  checkBasra2 = false
                }
            }
            if(mult3 == true){
                incrementCounter(cardCount+4, type);
                $(th).remove();
                if(checkBasra3 == true && $(".spaceLand  img").length ==0){
                  $('audio').attr("src","audio/basra.mp3")
                  $("."+basraType).css("display","block")
                  incrementCounter(9, type)
                  basraCard($(th), basraType)
                  checkBasra3 = false
                }
            }else if(mult3 != true && mult != true){
                var x = $("<div class='card'>");
                x.append($(th));
                $(".spaceLand").append(x)
            }
        }
}// End checkCards Function

/****************** Check Two Cards Are Identical ********************/
function checkIsEqual(n){
    cardCount =0;
    var x = false;
    var arrX =  $(".spaceLand img ");
         for(var i=0; i < arrX.length; i++){
         var parsVal = arrX.eq(i).attr("value")
          if(n == parsVal) {
              cardCount ++;
             arrX.eq(i).parent().remove();
             console.log(cardCount)
            x = true;
          }
        }
        if(x==true){
            return true
        }
    }

/****************** Sum  Function ************************/
function  MultiEqual(n){
    var xflag = false;
    var allImage = $(".spaceLand img");
    for(var i=0; i < allImage.length; i ++){
        var imgValue = parseInt(allImage.eq(i).attr("value"));
        for(var x =i+1; x < allImage.length; x++){
            var val1 = parseInt(allImage.eq(i).attr("value"));
            var val2 = parseInt(allImage.eq(x).attr("value"));
            if(n == ( val1 + val2)){
                allImage.eq(x).parent().remove();
                allImage.eq(i).parent().remove();
                if(n == ( val1 + val2) && $(".spaceLand img").length==0){
                  checkBasra2 = true;
                }
                return true;
            }
        }
    }
            // return xflag
}

function  MultiEqual3(n){
    var xflag = false;
    var allImage = $(".spaceLand img");
    for(var i=0; i < allImage.length; i ++){
        var imgValue = parseInt(allImage.eq(i).attr("value"));
        for(var x =i+1; x < allImage.length; x++){
            for(var z=i+2; z < allImage.length; z++){
                var val1 = parseInt(allImage.eq(i).attr("value"));
                var val2 = parseInt(allImage.eq(x).attr("value"));
                var val3 = parseInt(allImage.eq(z).attr("value"));
                if(n == ( val1 + val2 + val3)){
                    allImage.eq(x).parent().remove();
                    allImage.eq(i).parent().remove();
                    allImage.eq(z).parent().remove();
                    if(n == ( val1 + val2 + val3) && $(".spaceLand img").length==0){
                      checkBasra3 = true;
                    }
                    return true;
                }
            }
        }
    }

        // return xflag
}

/****************** Increment Score Function ************************/
function incrementCounter(n,type){
    if(type == "playerScore"){
    counterPlayer+=n;
    $("."+ type +"  > span").html(counterPlayer);
    }else if(type == "computerScore"){
        counterComputer+=n;
        $("."+ type +"  > span").html(counterComputer);
    }
}

/****************** Random Cards After Every Round ********************/
function randomCardsRound(){
    sideCardsR(theImages);
    $(".comcards img").css("display","inline-block");
    randomHuman(); // Call Human Random Function
    randomCompute(); //Call Computer Random Function
    sideCardsR(theImages); // Call Sidebar Ramove cards
}

/****************** Function Get Username ********************/
function getUserName(){
    var userName = localStorage.getItem("username");
    $(".playerScore h4").html(userName);
    return userName;
}

/****************** New Player Button ********************/
$(".newPlayer").on("click",function(){
     window.location = "index.html";
})

/****************** Computer Turn Function ********************/
function ComputerTurn(){
    $(".playercards").off("click","img",playing())
    var w = setTimeout(() => {
        $('audio').attr("src","audio/sound_part.mp3")
        checkCards($(computeCards[0]), "computerScore", "basra_com"); // pass a computer array as a paramater
        $(".comcards img").eq(0).remove()
        computeCards.splice(0, 1);
        // Check Cards after Every Round
        if($(".comcards img").length ==0){
            checkCardsCount(theImages)
            randomCardsRound();
            $('audio').attr("src","audio/sound.mp3")
        }
        $(".playercards").on("click","img",playing())
    }, 1000);
}

function playing(){
    $(".playercards").on("click","img",function(){
        $('audio').attr("src","audio/sound_part.mp3")
        checkCards($(this), "playerScore", "basra_player")
        ComputerTurn();
        if(counterPlayer > counterComputer){
            $(".computerScore").css("background","#090e20")
            $(".playerScore").css("background","#4ea502")
        }else if(counterComputer > counterPlayer){
            $(".playerScore").css("background","#090e20")
            $(".computerScore").css("background","#4ea502")
        }
    })
}

function basraCard(th, type) {
    $('.'+type).append($("<img src='"+$(th).attr("src")+"' style='top:"+(positionTop+=20)+"px'>"))

}
// }); // end of document ready

const barHTML = "<div class='bar'></div>";
const maxHeightPerc = 80;
const spaceBtwBars = 10;
const maxValueOfGenerateNb = 500;
var randomValues = [];
var maxValueFromArray = 0;
var defaultBarWidth = 20;
var areaWidth = 0;

var generateRandomNumbers = function(amount){
    var array=[];
    for (var i=0;i<amount;i++)
    array[i] =  Math.ceil(Math.random()*maxValueOfGenerateNb);
    return array;
}

var init = function(bars){
    areaWidth = $(".area").width();
    randomValues = generateRandomNumbers(bars);
    maxValueFromArray = Math.max.apply(Math,randomValues);
    defaultBarWidth = (areaWidth-bars*spaceBtwBars)/bars;
}

var clean = function(){
    $(".bar").remove();
}


$( document ).ready(function() {

    console.log(areaWidth);
    $("#generate").click(function(event){
        clean();
        var nbOfBars = $("#nb").val();
        init(nbOfBars);
        for (var i=0;i<nbOfBars;i++){
            $(".area").append(barHTML);
        }
        $(".bar").each(function(index,element){
            $(element).css("left",index*(defaultBarWidth+spaceBtwBars)+'px');
            $(element).css("height",Math.min(5+randomValues[index]*maxHeightPerc/maxValueFromArray,maxHeightPerc)+'%');
            $(element).css("width",defaultBarWidth+'px');
            $(element).append("<span class='span-style'>"+randomValues[index]+"</span>");
        })
    })
});




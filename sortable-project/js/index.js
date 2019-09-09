const barHTML = "<div class='bar'></div>";
const maxHeightPerc = 80;
const spaceBtwBars = 1;
const maxValueOfGenerateNb = 250;
const MAX_INTERVAL = 1000;
const MIN_INTERVAL = 10;


var randomValues = [];
var maxValueFromArray = 0;
var defaultBarWidth = 20;
var areaWidth = 0;
var nbOfBars = 0;
var i = 0;
var j = 0;
var intervalTimer = 250;


var generateRandomNumbers = function (amount) {
    var array = [];
    for (var i = 0; i < amount; i++)
        array[i] = Math.ceil(Math.random() * maxValueOfGenerateNb);
    return array;
}

var init = function (bars) {
    areaWidth = $(".area").width();
    randomValues = generateRandomNumbers(bars);
    maxValueFromArray = Math.max.apply(Math, randomValues);
    defaultBarWidth = (areaWidth - bars * spaceBtwBars) / bars;
}

var clean = function () {
    $(".bar").remove();
}

var bubbleSort = function (array) {
    var array_length = array.length;
    var temp;
    for (var i = 0; i < array_length; i++) {
        for (j = 0; j < array_length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                drawOnHtml();
            }
        }
    }
    return array;
}

var bubbleSortInterval = function (array, i, j) {
    var array_length = array.length;
    var temp;
    colourTheSelected(j + 1, j + 2, "green");
    if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        colourTheSelected(j + 1, j + 2, "red");
        changeHeights(j + 1, j + 2);
        drawOnHtml();
    }
    if (j >= array_length - i - 1) {
        i++;
        j = -1;
    }
    j++;
    if (i < array_length)
        return { arr: array, i: i, j: j };
    else
        return false;

}

var bubbleSortGenerator = function* () {
    var temp;
    var array = randomValues;
    var array_length = array.length;
    var x=0;
    for (var i = 0; i < array_length; i++) {
        for (j = 0; j < array_length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                x=1;
            }
            console.log(x);
            yield { index: j,change:x };
            x=0;
        }
    }
}


var drawOnHtml = function () {
    clean();
    for (var i = 0; i < nbOfBars; i++) {
        $(".area").append(barHTML);
    }
    $(".bar").each(function (index, element) {
        $(element).css("left", index * (defaultBarWidth + spaceBtwBars) + 'px');
        $(element).css("height", Math.min(5 + randomValues[index] * maxHeightPerc / maxValueFromArray, maxHeightPerc) + '%');
        $(element).css("width", defaultBarWidth + 'px');
        $(element).append("<span class='span-style'>" + randomValues[index] + "</span>");
    })
}

var colourTheSelected = function (index1, index2, color) {
    $(".bar:nth-of-type("+index1+")").css("background-color", color);
    $(".bar:nth-of-type("+index2+")").css("background-color", color);

}

var changeHeights = function (index1, index2) {
    // TODO
    var temp = $(".bar:nth-of-type("+index1+")");
    console.log($(".bar:nth-of-type("+index1+")"))
    console.log($(".bar:nth-of-type("+index2+")"))
    // $(".bar:nth-of-type("+index1+")").css("left", $(".bar:nth-of-type("+index2+")").css('left'));
    // $(".bar:nth-of-type("+index2+")").css("left", temp);
    $(".bar:nth-of-type("+index1+")") = $(".bar:nth-of-type("+index2+")");
    $(".bar:nth-of-type("+index2+")") = temp;
}


$(document).ready(function () {
    $('#arr_size').text($("#nb").val());


    $("#generate").click(function (event) {
        nbOfBars = $("#nb").val();
        init(nbOfBars);
        drawOnHtml();

    })

    $("#nb").change(function () {
        intervalTimer = 5 * MAX_INTERVAL / $(this).val();
        $('#arr_size').text($(this).val());
    })

    $("input[type='radio']").each(function (index, element) {

        $(element).change(function () {
            var interval;
            switch (element.id) {
                // case 'bubble': interval = setInterval(function () {
                //     var resp = bubbleSortInterval(randomValues, i, j);
                //     if (resp != false) {
                //         randomValues = resp.arr
                //         i = resp.i
                //         j = resp.j
                //     }
                //     else {
                //         clearInterval(interval);
                //     }

                // }, intervalTimer); break;
                case 'bubble': var bubbleSortGen = bubbleSortGenerator();
                    setInterval(function () {
                        var generatorValue= bubbleSortGen.next(randomValues).value;
                        var index = generatorValue.index;
                        var change= generatorValue.change;
                        colourTheSelected(index+1,index+2,"darkgreen");
                        setTimeout(function () {
                            if(change == 1){
                                colourTheSelected(index+1,index+2,"darkred");
                                changeHeights(index+1,index+2);
                                console.log(randomValues);
                                setTimeout(function () {
                                    colourTheSelected(index+1,index+2,"cornflowerblue");
                                }, intervalTimer / 3);
                            }
                            else{
                                setTimeout(function () {
                                    colourTheSelected(index+1,index+2,"cornflowerblue");
                                }, intervalTimer / 2);
                            }
                            
                        }, intervalTimer / 4);
                    }, 2*intervalTimer);
                    break;
                default: alert("Not done yet! Please wait."); break;
            }
        })
    })




});




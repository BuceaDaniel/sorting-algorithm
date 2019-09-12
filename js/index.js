const barHTML = "<div class='bar'></div>";
const maxValueOfGenerateNb = 250;
const MAX_INTERVAL = 2000;
const MIN_INTERVAL = 50;

var spaceBtwBars = 6;
var randomValues = [];
var maxValueFromArray = 0;
var defaultBarWidth = 20;
var areaWidth = 0;
var nbOfBars = 0;
var i = 0;
var j = 0;
var intervalTimer = 250;
var barsArray = [];


var generateRandomNumbers = function (amount) {
    var array = [];
    for (var i = 0; i < amount; i++) {
        barsArray[i] = i + 1;
        array[i] = Math.ceil(Math.random() * maxValueOfGenerateNb);
    }
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


// ====================> Delete later

// var bubbleSort = function (array) {
//     var array_length = array.length;
//     var temp;
//     for (var i = 0; i < array_length; i++) {
//         for (j = 0; j < array_length - i - 1; j++) {
//             if (array[j] > array[j + 1]) {
//                 temp = array[j];
//                 array[j] = array[j + 1];
//                 array[j + 1] = temp;
//                 drawOnHtml();
//             }
//         }
//     }
//     return array;
// }

// var bubbleSortInterval = function (array, i, j) {
//     var array_length = array.length;
//     var temp;
//     colourTheSelected(j + 1, j + 2, "green");
//     if (array[j] > array[j + 1]) {
//         temp = array[j];
//         array[j] = array[j + 1];
//         array[j + 1] = temp;
//         colourTheSelected(j + 1, j + 2, "red");
//         changeHeights(j + 1, j + 2);
//         drawOnHtml();
//     }
//     if (j >= array_length - i - 1) {
//         i++;
//         j = -1;
//     }
//     j++;
//     if (i < array_length)
//         return { arr: array, i: i, j: j };
//     else
//         return false;

// }


// End Delete


// SORT ALGORITHMS

// ===== Bubble Sort ======
var bubbleSortGenerator = function* () {
    var temp;
    var array = randomValues;
    var array_length = array.length;
    var x = 0;
    var last = 0;
    for (var i = 0; i < array_length; i++) {
        last = false;
        for (var j = 0; j < array_length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                x = 1;
            }
            if (j == array_length - i - 2) last = true;
            // console.log(j, array_length - i - 1)
            yield { index: j, change: x, last: last };
            x = 0;
        }
    }
}

// ===== End of Bubble Sort =====

// ===== Heap Sort =====

function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max]) {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input) {

    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(input, i);
    }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
        heap_root(input, 0);
    }
}

// ==== End of Heap Sort ====



// ===== Quick Sort ======
function* partitionGenerator(items, left, right) {
    var indexPivot = Math.floor((right + left) / 2)
    var pivot   = items[indexPivot], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            yield {index:i, val:items[i], pivot:pivot, indexPivot:indexPivot};
            i++;
        }
        while (items[j] > pivot) {
            yield {index:j, val:items[j], pivot:pivot, indexPivot:indexPivot};
            j--;
        }
        if (i <= j) {
            var temp = items[i];
            items[i] = items[j];
            items[j] = temp;
            i++;
            j--;
        }
        console.log(items);
    }
    // return i;
}

function quickSort(items, left, right) {
    var index;
    var partitionGen = partitionGenerator(items,left,right);
    console.log(partitionGen.next());
    index = partitionGen.next().value;
    console.log(index);
    // quickSort(items, index, right);

    // if (items.length > 1) {
    //     // index = partition(items, left, right); //index returned from partition
    //     if (left < index - 1) { //more elements on the left side of the pivot
    //         quickSort(items, left, index - 1);
    //     }
    //     if (index < right) { //more elements on the right side of the pivot
    //         quickSort(items, index, right);
    //     }
    // }
    return items;
}

function* quickSortGenerator(items,left,right){
        var partitionGen = partitionGenerator(items,left,right);
        for (var i=0;i<10;i++){
            var partValue = partitionGen.next();
            console.log(partValue.value);
        }
        
        yield partValue;

}

// ====== End of Quick Sort ======


//END OF SORT ALGORITHMS


var drawOnHtml = function () {
    clean();
    for (var i = 0; i < nbOfBars; i++) {
        $(".area").append(barHTML);
    }
    $(".bar").each(function (index, element) {
        $(element).css("left", index * (defaultBarWidth + spaceBtwBars) + 'px');
        $(element).css("height",20 + randomValues[index] * 2.5 + 'px');
        $(element).css("width", defaultBarWidth + 'px');
        $(element).append("<span class='span-style'>" + randomValues[index] + "</span>");
    })
    if (nbOfBars > 30)  $('.span-style').css("display","none");

}
var colourTheSelected = function (index1, index2, color) {
    if (index1 != null) $(".bar:nth-of-type(" + index1 + ")").css("background-color", color);
    if (index2 != null) $(".bar:nth-of-type(" + index2 + ")").css("background-color", color);

}

var changeHeights = function (index1, index2) {
    var temp = $(".bar:nth-of-type(" + barsArray[index1] + ")").css('left');
    var temp2 = barsArray[index1];
    $(".bar:nth-of-type(" + barsArray[index1] + ")").css("left", $(".bar:nth-of-type(" + barsArray[index2] + ")").css('left'));
    $(".bar:nth-of-type(" + barsArray[index2] + ")").css("left", temp);
    barsArray[index1] = barsArray[index2];
    barsArray[index2] = temp2;
}


$(document).ready(function () {
    nbOfBars = $("#nb").val();
    nbOfBars = 7;
    $('#arr_size').text(nbOfBars);
    init(nbOfBars);
    drawOnHtml();

    $("#generate").click(function (event) {
        init(nbOfBars);
        drawOnHtml();
    })

    $("#nb").change(function () {
        nbOfBars = $(this).val();
        intervalTimer = 5 * MAX_INTERVAL / nbOfBars;
        spaceBtwBars = nbOfBars < 10 ? 10 : nbOfBars < 30 ? 6 : nbOfBars < 70 ? 4 : 2;
        $('#arr_size').text(nbOfBars);
        init(nbOfBars);
        drawOnHtml();
    })

    $("input[type='radio']").each(function (index, element) {

        $(element).change(function () {
            var interval;
            switch (element.id) {
                case 'bubble': var bubbleSortGen = bubbleSortGenerator();
                    var bubbleInterval = setInterval(function () {
                        var generatorValue = bubbleSortGen.next(randomValues).value;
                        if (!generatorValue) {
                            clearInterval(bubbleInterval);
                            $(".bar").css("background-color", "purple");
                        }
                        else {
                            var index = generatorValue.index;
                            var change = generatorValue.change;
                            var last = generatorValue.last;
                            colourTheSelected(barsArray[index], barsArray[index + 1], "green");
                            setTimeout(function () {
                                if (change == 1) {
                                    colourTheSelected(barsArray[index], barsArray[index + 1], "red");
                                    changeHeights(index, index + 1);
                                }
                                else {
                                    colourTheSelected(barsArray[index], barsArray[index + 1], "green");
                                }
                                setTimeout(function () {
                                    if (last == true) {
                                        colourTheSelected(barsArray[index + 1], null, "purple");
                                        colourTheSelected(barsArray[index], null, "cornflowerblue");
                                    }
                                    else {
                                        colourTheSelected(barsArray[index], barsArray[index + 1], "cornflowerblue");

                                    }
                                }, intervalTimer / 3);
                            }, intervalTimer / 3);
                        }
                    }, intervalTimer);
                    break;
                case "heap": heapSort(randomValues); console.log(randomValues); break;
                case "quick": var quickSortGen = quickSortGenerator(randomValues,0,randomValues.length-1); 
                    quickSortGen.next();
                break;
                default: alert("Not done yet! Please wait."); break;
            }
        })
    })




});




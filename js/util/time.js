/**
 * @author uryu1994
 */

/**
 * フレームレートを秒に変換する
 * @param  {num} fps フレームレート
 * @return {num}     秒を返す
 */
function calcSeconds(fps) {
    return fps / 60;
}

// var limitSeconds = 10;
var started = false;
var first_st = false;

/**
 * フレームレートによる時間制御関数
 * @param {number} fps フレームレート
 * @return {number} fps フレームレートを返す
 */
function timeControll(fps) {
    if (started == true) {
        first_st = true;
        experimentEffect();
        fps++;
    }

    return fps;
}


var move_seconds = 0;
var stop_seconds = 0;
var experiment_timer;

function timer() {
    document.getElementById("timer").innerHTML = "探索時間:" + move_seconds +"秒";
    if (first_st == true && started == true) {
        move_seconds++;
    } else if(first_st == true){
        stop_seconds++;
    }
}

function startTimer() {
    experiment_timer = setInterval("timer()", 1000);
}

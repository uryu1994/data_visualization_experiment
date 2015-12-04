function buttonPushed(action) {
    if (action.value == "start") {
        startButton();
    } else if (action.value == "stop") {
        stopButton();
    }
}

function stopButton() {
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = true;
    started = false;
    initEvent();
    report();
}

function startButton() {
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
    started = true;
}

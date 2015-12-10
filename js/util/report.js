/**
 * @author uryu1994
 */

var colorSelectCheck = new Array(7);

function report() {
    if(resetPosition == true) {
        for(var i = 0; i < distinctiveObjects.length; i++) {
            distinctiveObjects[i].resetObject();
        }

        for(var j = 0; j < cubeRandomObjects.length; j++) {
            cubeRandomObjects[j].resetObject();
        }
        
    }

    if(experimentType == 0) {
        positionReport();
    } else if(experimentType == 1){
        colorReport();
    } else if(experimentType == 2) {
        for(var i = 0; i < distinctiveObjects.length; i++) {
            distinctiveObjects[i].material.color.set(selectColor(1, i));
        }
        for(var j = 0; j < cubeRandomObjects.length; j++) {
            cubeRandomObjects[j].material.color.set(selectColor(0, j));
        }
        colorReport();
    }
}

function colorReport() {
    var select = document.getElementById('select');
    var selectForm = document.createElement('form');
    selectForm.name = 'selectForm';
    select.appendChild(selectForm);

    for(var i = 0; i < colorSelectCheck.length; i++) {
        colorSelectCheck[i] = document.createElement('input');
        colorSelectCheck[i].type = 'checkbox';
        colorSelectCheck[i].value = i;
        colorSelectCheck[i].name = 'selectColor';
        var label = document.createElement('label');
        label.appendChild(colorSelectCheck[i]);
        label.appendChild(document.createTextNode(colorLabel[i]+ " "));
        // label.appendChild(document.createTextNode("■ "));
        selectForm.appendChild(label);
    }
    var sendButton = document.createElement('input');
    sendButton.type = 'button';
    sendButton.value = '解答';
    sendButton.className = "btn btn-default";
    var func = "colorAnswer();";
    sendButton.setAttribute('onclick', func);
    selectForm.appendChild(sendButton);
}

function positionReport() {
    initEvent();
    var select = document.getElementById('select');
    var selectForm = document.createElement('form');
    selectForm.name = 'selectForm';
    select.appendChild(selectForm);

    var sendButton = document.createElement('input');
    sendButton.type = 'button';
    sendButton.value = "解答";
    sendButton.className = "btn btn-default";
    var func = "positionAnswer()";
    sendButton.setAttribute('onclick', func);
    selectForm.appendChild(sendButton);
}

function result() {
    document.getElementById('result_color').innerHTML = "正解は、"
    + colorLabel[distinctiveColor[0]] + ", "
    + colorLabel[distinctiveColor[1]] + ", "
    + colorLabel[distinctiveColor[2]] + "です。"
}

function positionAnswer() {
    var selectCount = 0;
    var answerCount = 0;
    for(var i = 0; i < cubeRandomObjects.length; i++) {
        if(cubeRandomObjects[i].obj.clicked==1) {
            selectCount++;
        }
    }
    for(var j = 0; j < distinctiveObjects.length; j++) {
        if(distinctiveObjects[j].obj.clicked==1) {
            selectCount++;
            answerCount++;
        }
    }
    if(selectCount!=targetobjects_num) {
        alert(targetobjects_num+"つ選択してください。");
    } else {
        document.getElementById('result_count')
        .innerHTML = targetobjects_num + "個中" + answerCount + "個正解";
    }
}

function colorAnswer() {
    var checkedBox = new Array(targetobjects_num);
    var checkNum=0;

    for(var i = 0; i < document.selectForm.selectColor.length; i++) {
        if(document.selectForm.selectColor[i].checked) {
            checkedBox[i] = document.selectForm.selectColor[i].value;
            checkNum++;
        }
    }
    if(checkNum != targetobjects_num) {
        alert('3つ選択してください。');
    } else {
        var correctCount = 0;
        for(var i = 0; i < checkedBox.length; i++) {
            if(distinctiveColor.indexOf(parseInt(checkedBox[i]))!= -1) {
                correctCount++;
            }
        }
        document.getElementById('result_count').innerHTML = "3個中"+correctCount+"個正解";
        result();
    }
}

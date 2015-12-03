/**
 * @author uryu1994
 */

var colorSelectCheck = new Array(7);

function report() {
    for(var i = 0; i < distinctiveObjects.length; i++) {
        distinctiveObjects[i].resetObject();
    }

    for(var j = 0; j < cubeRandomObjects.length; j++) {
        cubeRandomObjects[j].resetObject();
    }

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
        selectForm.appendChild(label);
    }
    var sendButton = document.createElement('input');
    sendButton.type = 'button';
    sendButton.value = '解答';
    sendButton.className = "btn btn-default";
    var func = "answer();";
    sendButton.setAttribute('onclick', func);
    selectForm.appendChild(sendButton);

}

function result() {
    document.getElementById('result_color').innerHTML = "正解は、"
    + colorLabel[distinctiveColor[0]] + ", "
    + colorLabel[distinctiveColor[1]] + ", "
    + colorLabel[distinctiveColor[2]] + "です。"
}

function answer() {
    var checkedBox = new Array(3);
    var checkNum=0;

    for(var i = 0; i < document.selectForm.selectColor.length; i++) {
        if(document.selectForm.selectColor[i].checked) {
            checkedBox[i] = document.selectForm.selectColor[i].value;
            checkNum++;
        }
    }
    if(checkNum != 3) {
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

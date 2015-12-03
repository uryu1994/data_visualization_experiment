/**
 * @author uryu1994
 */

var colordata = [
    "rgb(255, 0, 0)",       // 赤
    "rgb(0, 255, 0)",       // 緑
    "rgb(0, 0, 255)",       // 青
    "rgb(255, 255, 0)",     // 黄
    "rgb(0, 255, 255)",     // 水色
    "rgb(255, 0, 255)",     // 紫
    "rgb(139, 69, 19)"      // 茶色
];

var distinctiveColor = [-1, -1, -1];
var colorPattern = [0,1,2,3,4,5,6];

var colorLabel = ["赤", "緑", "青", "黄", "水色", "紫", "茶色"];

/**
 * 特徴あるオブジェクトの色を選択します
 * @return {[type]} [description]
 */
function distinctiveColorPattern() {
    colorPattern = shuffle(colorPattern);
    for(var i =0; i < distinctiveColor.length; i++) {
        //distinctiveColor[i] = Math.floor(Math.random() * 8);
        distinctiveColor[i] = colorPattern[i];
    }
}

/**
 * 色を選択します
 * @param  {number}     type    特徴あるオブジェクトか、それ以外か
 * @param  {number}     num     何番目か
 * @return {THREE.Color}        THREE.Colorオブジェクトを返します
 */
function selectColor(type, num) {
    var select_color;
    if(type == 1) {
        select_color = new THREE.Color(colordata[distinctiveColor[num]]);
    } else {
        select_color = new THREE.Color(colordata[Math.floor(Math.random() * 7)]);
    }

    return select_color;
}

function shuffle(a) {
  for (var i=a.length-1;i>=0;i--) {
    var r=Math.floor(i*Math.random());
    var tmp=a[i];
    a[i]=a[r];
    a[r]=tmp;
  }
  return a;
}

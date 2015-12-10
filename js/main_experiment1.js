/* global THREE, Integer */

/**
 * @author uryu1994
 */

window.addEventListener("load", function() {
    threeStart();
});

var mainCameraObject;
var playback = true;

/**
 * 実験の種類を示す変数(0は色無し, 1は色付き)
 * @experimentType {Number}
 */
var experimentType = 0;
var resetPosition = true;

/**
 * three.jsを開始します
 */
function threeStart() {
    initThree();
    mainCameraObject = new MainCameraObject();
    initLight();
    distinctiveColorPattern();
    createObject();
    before();
    startTimer();
    loop();
}

var renderer,
    scene,
    canvasFrame,
    windowWidth,
    windowHeight;

/**
 * 3次元空間の初期化を行います
 */
function initThree() {
    canvasFrame = document.getElementById('canvas-frame');
    renderer = new THREE.WebGLRenderer();
    if (!renderer)
        alert('three.js の初期化に失敗しました');
    renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
    canvasFrame.appendChild(renderer.domElement);
    renderer.setClearColorHex(0x000000, 1.0);
    scene = new THREE.Scene();
}
var fps = 0;
/**
 * 無限ループ関数の定義
 */
function loop() {
    requestAnimationFrame(loop);
    mainCameraObject.camera.up.set(0, 0, 1);
    mainCameraObject.camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    });
    whiteDirectionalLight.functionControll();
    renderer.render(scene, mainCameraObject.camera);
    mainCameraObject.trackball.update();
    mainCameraObject.updateCamera();
    fps = timeControll(fps);
}

var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
        window.setTimeOut(callback, 1000 / 60);
    };

var rgbDirectionalLight,
    whiteDirectionalLight;

/**
 * 光源の設定を行います
 */
function initLight() {
    whiteDirectionalLight = new WhiteDirectionalLight();
}

var lastTime;

var axis;
var arrows;

/**
 * 座標軸の初期化を行います
 */
function initObject() {
    axis = new THREE.AxisHelper(1000);
    //scene.add(axis);
    axis.position.set(0, 0, 0);

    var arrows = new THREE.Object3D();
    arrows.add(
        new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 0, 0), 1000, 0xFF0000));

    arrows.add(
        new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, 0, 0), 1000, 0x00FF00));

    arrows.add(
        new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, 0), 1000, 0x0000FF));

    scene.add(arrows);

}

var cubeRandomObjects,
    distinctiveObjects,
    rayReceiveObjects;

var count;

var targetobjects_num = 3;
var objects_num = 500;

/**
 * オブジェクトを生成します
 */
function createObject() {
    cubeRandomObjects = new Array(objects_num - targetobjects_num);
    distinctiveObjects = new Array(targetobjects_num);
    rayReceiveObjects = new Array(objects_num);
    count = rayReceiveObjects.length;
    for (var i = 0; i < cubeRandomObjects.length; i++) {
        cubeRandomObjects[i] = new CubeObject();
        cubeRandomObjects[i].createCubeObject(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            0,
            i,
            experimentType
        );
        cubeRandomObjects[i].obj.content = 'distractor';
        scene.add(cubeRandomObjects[i].obj);
        rayReceiveObjects[i] = cubeRandomObjects[i].obj;
    }

    for (var j = 0; j < distinctiveObjects.length; j++) {
        distinctiveObjects[j] = new CubeObject();
        distinctiveObjects[j].createCubeObject(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            1,
            j,
            experimentType
        );
        distinctiveObjects[j].obj.content = 'target';
        scene.add(distinctiveObjects[j].obj);
        rayReceiveObjects[i+j] = distinctiveObjects[j].obj;
    }
}

/**
 * オブジェクトのカラーを変更
 */
function changeColor(obj) {
    var color = new THREE.Color();
    var specular = new THREE.Color();
    color.setRGB(Math.random(), Math.random(), Math.random());
    specular.setRGB(Math.random(), Math.random(), Math.random());
    obj.material.color.set(color);
    obj.material.specular.set(specular);
}

/**
 * 3次元空間の描画を行います(一度だけ)
 */
function draw() {
    renderer.clear();
    renderer.render(scene, mainCameraObject.camera);
}

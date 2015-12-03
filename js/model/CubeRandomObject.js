/**
 * @author uryu1994
 */

/**
 * CubeRandomObjectのコンストラクタ
 */
var CubeRandomObject = function(n) {

    this.objects = new Array(n);

    this.createCubeRandomObjects();
};

/**
 * Phong鏡面反射用の材質を作成
 */
CubeRandomObject.prototype.phongMaterial = function() {
    var material = new THREE.MeshPhongMaterial();
    var color = new THREE.Color();
    var specular = new THREE.Color();

    color.setRGB(Math.random(), Math.random(), Math.random());
    specular.setRGB(Math.random(), Math.random(), Math.random());

    material.color.set(color);
    material.specular.set(specular);
    material.shiness = 10000;

    return material;
};

/**
 * Lambert拡散反射用の材質を作成
 */
CubeRandomObject.prototype.lambertMaterial = function() {
    var material = new THREE.MeshLambertMaterial();
    var color = new THREE.Color();
    color.setRGB(Math.random(), Math.random(), Math.random());
    material.color.set(color);
    return material;
};

/**
 * オブジェクトを生成
 */
CubeRandomObject.prototype.createCubeRandomObjects = function() {
    for (var i = 0; i < this.objects.length; i++) {
        var geometry = new THREE.CubeGeometry(10, 10, 10);
        var material = this.phongMaterial();
        this.objects[i] = new THREE.Mesh(geometry, material);

        /* ランダムに配置 */
        this.objects[i].rotation.set(
            Math.PI * (Math.random() * 2),
            Math.PI * (Math.random() * 2),
            Math.PI * (Math.random() * 2));
        this.objects[i].position.set(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500);
    }
};

CubeRandomObject.prototype.rotateCubeRandomObjects = function() {
    for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].rotation.x += 0.1;
        this.objects[i].rotation.y += 0.1;
        this.objects[i].rotation.z += 0.1;
    }
};

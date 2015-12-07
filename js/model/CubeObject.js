/**
 * @author uryu1994
 */

/**
 * CubeObjectのコンストラクタ
 * @constructor
 * @classdesc 立方体関連のクラス
 */
var CubeObject = function() {
    this.geometry = new THREE.BoxGeometry(10, 10, 10);
    this.material = new THREE.MeshPhongMaterial();
    this.color = new THREE.Color();
    this.specular = new THREE.Color();
    this.obj = new THREE.Mesh(this.geometry, this.material);
    this.obj_pos = {
        x: 0,
        y: 0,
        z: 0
    }

    this.obj_col;
    this.obj_spe;
    this.obj_rot;

    this.time = {
        flashTime: 0,
        rotateTime: 0,
        rotateMoveTime: 0,
        moveTime: 0,
        changeColorTime: 0,
        changeSpecularTime: 0,
        vibrateTime: 0,
        moveStraightRepeatTime: 0,
        changeScaleTime: 0
    };

    this.obj['clicked'] = 0;
    this.obj['content'];

}

CubeObject.prototype.createCubeObject = function(x, y, z, type, num) {
    this.obj.position.set(x, y, z);
    //this.color = selectColor(type, num);
    this.color = new THREE.Color("rgb(255, 255, 255)");
    this.specular.setRGB(
        Math.random(),
        Math.random(),
        Math.random()
    );
    this.obj.rotation.set(
        Math.random() * 360 * (Math.PI / 180),
        Math.random() * 360 * (Math.PI / 180),
        Math.random() * 360 * (Math.PI / 180)
    );
    this.material.color.set(this.color);
    this.material.specular.set(this.specular);
    this.material.shininess = 255;
    this.obj_pos = $.extend(true, {}, this.obj.position);
    this.obj_rot = $.extend(true, {}, this.obj.rotation);
    this.obj_col = $.extend(true, {}, this.obj.material.color);
    this.obj_spe = $.extend(true, {}, this.obj.material.specular);
}

CubeObject.prototype.resetObject = function() {
    this.obj.position.copy(this.obj_pos);
    this.obj.rotation.copy(this.obj_rot);
    this.obj.material.specular.copy(this.obj_spe);
    this.obj.material.color.copy(this.obj_col);
    this.obj.scale.set(1, 1, 1);
    this.obj.material.shininess = 255;

    this.time.flashTime = 0;
    this.time.rotateTime = 0;
    this.time.rotateMoveTime = 0;
    this.time.moveTime = 0;
    this.time.changeColorTime = 0;
    this.time.changeSpecularTime = 0;
    this.time.vibrateTime = 0;
    this.time.moveStraightRepeatTime = 0;
    this.time.changeScaleTime = 0;
};

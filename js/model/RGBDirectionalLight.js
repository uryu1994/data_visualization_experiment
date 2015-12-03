/**
 * @author uryu1994
 */

/**
 * コンストラクタ
 */
var RGBDirectionalLight = function() {
    /* DirectionalLight */
    this.redDirectionalLight = new THREE.DirectionalLight(0xFF0000, 1.6);
    this.blueDirectionalLight = new THREE.DirectionalLight(0x0000FF, 1.6);
    this.greenDirectionalLight = new THREE.DirectionalLight(0x00FF00, 1.6);
};

RGBDirectionalLight.prototype.initLight = function() {

    this.redDirectionalLight.position.set(500, 0, 500);
    this.blueDirectionalLight.position.set(500, 500, 0);
    this.greenDirectionalLight.position.set(0, 500, 500);

    this.red_pos = $.extend(true, {}, this.redDirectionalLight.position);
    this.blue_pos = $.extend(true, {}, this.blueDirectionalLight.position);
    this.green_pos = $.extend(true, {}, this.greenDirectionalLight.position);

    this.redDirectionalLight.castShadow = true;
    this.blueDirectionalLight.castShadow = true;
    this.greenDirectionalLight.castShadow = true;

    scene.add(this.redDirectionalLight);
    scene.add(this.blueDirectionalLight);
    scene.add(this.greenDirectionalLight);

    /* DirectionalLightHelper */
    this.redLightHelper = new THREE.DirectionalLightHelper(
        this.redDirectionalLight, 10);
    this.blueLightHelper = new THREE.DirectionalLightHelper(
        this.blueDirectionalLight, 10);
    this.greenLightHelper = new THREE.DirectionalLightHelper(
        this.greenDirectionalLight, 10);

    this.redLightHelper.targetLine.geometry.computeLineDistances();
    this.redLightHelper.targetLine.material = new THREE.LineDashedMaterial({
        color: 0xFF0000,
        dashSize: 2,
        gapSize: 1,
        linewidth: 2
    });

    this.blueLightHelper.targetLine.geometry.computeLineDistances();
    this.blueLightHelper.targetLine.material = new THREE.LineDashedMaterial({
        color: 0x0000FF,
        dashSize: 2,
        gapSize: 1,
        linewidth: 2
    });

    this.greenLightHelper.targetLine.geometry.computeLineDistances();
    this.greenLightHelper.targetLine.material = new THREE.LineDashedMaterial({
        color: 0x00FF00,
        dashSize: 2,
        gapSize: 1,
        linewidth: 2
    });

    scene.add(this.redLightHelper);
    scene.add(this.blueLightHelper);
    scene.add(this.greenLightHelper);

};

RGBDirectionalLight.prototype.movePosition = function(step) {
    this.redDirectionalLight.position.x = this.red_pos.x - Math.sin(step * Math.PI / 180) * Math.sqrt(Math.pow(this.red_pos.x, 2) + Math.pow(this.red_pos.z, 2));

    this.redDirectionalLight.position.z = this.red_pos.z - Math.cos(step * Math.PI / 180) * Math.sqrt(Math.pow(this.red_pos.x, 2) + Math.pow(this.red_pos.z, 2));

    this.redDirectionalLight.target.position.set(0, 0, 0);
    this.redLightHelper.targetLine.geometry.computeLineDistances();

    this.blueDirectionalLight.position.x = this.blue_pos.x - Math.sin(step * Math.PI / 180) * Math.sqrt(Math.pow(this.blue_pos.x, 2) + Math.pow(this.blue_pos.y, 2));

    this.blueDirectionalLight.position.y = this.blue_pos.y - Math.cos(step * Math.PI / 180) * Math.sqrt(Math.pow(this.blue_pos.x, 2) + Math.pow(this.blue_pos.y, 2));

    this.blueDirectionalLight.target.position.set(0, 0, 0);
    this.blueLightHelper.targetLine.geometry.computeLineDistances();

    this.greenDirectionalLight.position.y = this.green_pos.y - Math.sin(step * Math.PI / 180) * Math.sqrt(Math.pow(this.green_pos.y, 2) + Math.pow(this.green_pos.z, 2));

    this.greenDirectionalLight.position.z = this.green_pos.z - Math.cos(step * Math.PI / 180) * Math.sqrt(Math.pow(this.green_pos.y, 2) + Math.pow(this.green_pos.z, 2));

    this.greenDirectionalLight.target.position.set(0, 0, 0);
    this.greenLightHelper.targetLine.geometry.computeLineDistances();

    this.redDirectionalLight.target.rotation.y = Math.sin(step * Math.PI / 180);
    this.blueDirectionalLight.target.rotation.z = Math.sin(step * Math.PI / 180);
    this.greenDirectionalLight.target.rotation.x = Math.sin(step * Math.PI / 180);
};

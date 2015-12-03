/**
 * @author uryu1994
 */

var WhiteDirectionalLight = function() {
    this.light = new THREE.DirectionalLight(0xFFFFFF, 1.6);
    this.light.position.set(250, 250, 1000);
    this.light.castShadow = true;
    scene.add(this.light);
    this.light_pos = $.extend(true, {}, this.light.position);

    this.moveTime = 0;
    this.checkFunction = {
        rotate: 0
    };
};

WhiteDirectionalLight.prototype.movePosition = function() {
    this.light.position.x = this.light_pos.x * Math.sin(
        this.moveTime * (Math.PI / 180));
    this.light.position.y = this.light_pos.y * Math.cos(
        this.moveTime * (Math.PI / 180));
    this.light.position.z = this.light_pos.z * Math.sin(
        this.moveTime * (Math.PI / 180));
    this.lightHelper.update();
    this.lightHelper.targetLine.geometry.computeLineDistances();
    this.moveTime++;
    console.log(this.light.position);
};

WhiteDirectionalLight.prototype.addDirectionalLightHelper = function() {
    this.lightHelper = new THREE.DirectionalLightHelper(this.light, 10);
    this.lightHelper.targetLine.geometry.computeLineDistances();
    this.lightHelper.targetLine.material = new THREE.LineDashedMaterial({
        color: 0xFFFFFF,
        dashSize: 2,
        gapSize: 1,
        linewidth: 2
    });
    scene.add(this.lightHelper);
}

WhiteDirectionalLight.prototype.buttonClick = function(obj) {
    switch (obj.value) {
        case "rotate":
            if (this.checkFunction.rotate == 0) {
                this.checkFunction.rotate = 1;
                obj.innerHTML = "回転 ON";
            } else {
                this.checkFunction.rotate = 0;
                obj.innerHTML = "回転 OFF";
            }
            break;
    }
};

WhiteDirectionalLight.prototype.functionControll = function() {
    if (this.checkFunction.rotate == 1) {
        this.movePosition();
    }
};

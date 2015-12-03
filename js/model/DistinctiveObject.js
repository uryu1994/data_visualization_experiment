/**
 * DistinctiveObjectのコンストラクタ
 */
var DistinctiveObject = function(n) {

    this.obj = new Array(n);
    this.obj_pos = new Array(n);
    this.obj_rotation = new Array(n);
    this.obj_rotateCenter = new Array(n);
    this.obj_rotateRadius = new Array(n);
    this.obj_line = new Array(n);
    this.obj_Edges = new Array(n);

    this.time = {
        flashTime: 0,
        rotateTime: 0,
        rotateMoveTime: 0,
        moveTime: 0,
        changeColorTime: 0,
        changeSpecularTime: 0,
        vibrateTime: 0
    };

    this.checkFunction = {
        flash: 0,
        move: 0,
        rotateMove: 0,
        rotate: 0,
        vibration: 0,
        graph: 0
    };

};

/**
 * 特徴あるオブジェクトを埋め込みます
 */
DistinctiveObject.prototype.createDistinctiveObject = function(rangeX, rangeY, rangeZ) {
    for (var i = 0; i < this.obj.length; i++) {
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = new THREE.MeshPhongMaterial();
        var color = new THREE.Color();
        var specular = new THREE.Color();
        color.setRGB(0, 1, 0);
        specular.setRGB(1, 1, 1);
        material.color.set(color);
        material.specular.set(specular);
        material.shininess = 50;

        this.obj[i] = new THREE.Mesh(geometry, material);

        this.obj[i].position.set(
            Math.random() * rangeX - rangeX / 2,
            Math.random() * rangeY - rangeY / 2,
            Math.random() * rangeZ - rangeZ / 2);

        this.obj[i].rotation.set(
            Math.PI * (Math.random() * 2),
            Math.PI * (Math.random() * 2),
            Math.PI * (Math.random() * 2));

        this.obj_pos[i] = $.extend(true, {}, this.obj[i].position);
        this.obj_rotation[i] = $.extend(true, {}, this.obj[i].rotation);
        this.obj_rotateCenter[i] = {
            x: Math.random() * 500 - 250,
            y: Math.random() * 500 - 250,
            z: Math.random() * 500 - 250
        };
        var xPow = Math.pow(this.obj_pos[i].x - this.obj_rotateCenter[i].x, 2);
        var yPow = Math.pow(this.obj_pos[i].y - this.obj_rotateCenter[i].y, 2);
        var zPow = Math.pow(this.obj_pos[i].z - this.obj_rotateCenter[i].z, 2);
        this.obj_rotateRadius[i] = Math.sqrt(xPow + yPow + zPow);

        geometry.computeFaceNormals();

        this.obj_Edges[i] = new THREE.FaceNormalsHelper(
            this.obj[i], 2, 0x00ff00, 1
        );
    }
};

/**
 * 特徴あるオブジェクトを発光させます
 */
DistinctiveObject.prototype.flashDistinctiveObject = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].material.shininess = Math.sin(
            10 * this.time.flashTime * (Math.PI / 180)) * 50;
    }
    this.time.flashTime += 0.1;
};

/**
 * 特徴あるオブジェクトを上下に動かす
 *
 * @param {Object}
 *            step 描画ステップ
 */
DistinctiveObject.prototype.moveDistinctiveObject = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].position.z = 10 * Math.sin(
            5 * this.time.moveTime * (Math.PI / 180)) + this.obj_pos[i].z;
    }
    this.time.moveTime++;
};


/**
 * 特徴あるオブジェクトを振動させる
 */
DistinctiveObject.prototype.vibrateDistinctiveObject = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].position.set(
            this.obj_pos[i].x + 5 * (Math.random() * 2 - 1),
            this.obj_pos[i].y + 5 * (Math.random() * 2 - 1),
            this.obj_pos[i].z + 5 * (Math.random() * 2 - 1));

    }
};

/**
 * 特徴あるオブジェクトを回転移動させる
 *
 * @param {Object}
 *            step 描画ステップ
 */
DistinctiveObject.prototype.rotateMoveDistinctiveObject = function() {
    for (var i = 0; i < this.obj.length; i++) {
        if (i % 3 == 0) {
            this.obj[i].position.y =
                Math.cos(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].y - Math.sin(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].z;
            this.obj[i].position.z =
                Math.sin(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].y + Math.cos(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].z;
        } else if (i % 3 == 1) {
            this.obj[i].position.x =
                Math.cos(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].x + Math.sin(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].z;
            this.obj[i].position.z = -Math.sin(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].x + Math.cos(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].z;
        } else {
            this.obj[i].position.x =
                Math.cos(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].x - Math.sin(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].y;
            this.obj[i].position.y =
                Math.sin(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].x + Math.cos(this.time.rotateMoveTime * (Math.PI / 180)) * this.obj_pos[i].y;
        }
    }
    this.time.rotateMoveTime++;
};

/**
 * 特徴あるオブジェクトを回転させる
 *
 * @param {Object}
 *            step
 */
DistinctiveObject.prototype.rotateDistinctiveObject = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].rotation.x -= 0.1;
        this.obj[i].rotation.y -= 0.1;
        this.obj[i].rotation.z -= 0.1;
    }
};

/**
 * 特徴あるオブジェクトの環境色を一定周期で変更する
 */
DistinctiveObject.prototype.changeColor = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].material.color.setRGB(
            Math.pow(Math.sin(this.time.changeColorTime * (Math.PI / 180)), 2),
            Math.pow(Math.cos(this.time.changeColorTime * (Math.PI / 180)), 2),
            Math.pow(Math.sin(this.time.changeColorTime * (Math.PI / 180)), 2)
        );
    }
    this.time.changeColorTime++;
};

/**
 * 特徴あるオブジェクトの反射色を一定周期で変更する
 */
DistinctiveObject.prototype.changeSpecular = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].material.specular.setRGB(
            Math.pow(Math.sin(this.time.changeSpecularTime * (Math.PI / 180)), 2),
            Math.pow(Math.cos(this.time.changeSpecularTime * (Math.PI / 180)), 2),
            Math.pow(Math.sin(this.time.changeSpecularTime * (Math.PI / 180)), 2)
        );
    }
    this.time.changeSpecularTime++;
};

/**
 * ポジションを元に戻す
 */
DistinctiveObject.prototype.resetPosition = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj[i].position.x = this.obj_pos[i].x;
        this.obj[i].position.y = this.obj_pos[i].y;
        this.obj[i].position.z = this.obj_pos[i].z;

        this.obj[i].rotation.x = this.obj_rotation[i].x;
        this.obj[i].rotation.y = this.obj_rotation[i].y;
        this.obj[i].rotation.z = this.obj_rotation[i].z;

    }

    this.time.flashTime = 0;
    this.time.rotateTime = 0;
    this.time.rotateMoveTime = 0;
    this.time.moveTime = 0;
    this.time.changeColorTime = 0;
    this.time.changeSpecularTime = 0;
    this.time.vibrateTime = 0;

};

DistinctiveObject.prototype.createDistanceLine = function() {
    for (var i = 0; i < this.obj.length; i++) {
        this.obj_line[i] = new Array();
        for (var j = 0; j < this.obj.length; j++) {
            if (j - i > 0) {
                var lineGeometry = new THREE.Geometry();
                lineGeometry.vertices.push(this.obj[i].position);
                lineGeometry.vertices.push(this.obj[j].position);
                var color = new THREE.Color(this.calcDistance(
                    this.obj[i].position, this.obj[j].position
                ).toString(16));
                var line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
                    lineWidth: 20
                }));
                line.material.color = color;
                line.geometry.verticesNeedUpdate = true;
                line.geometry.lineDistancesNeedsUpdate = true;
                this.obj_line[i].push(line);
                scene.add(this.obj_line[i][this.obj_line[i].length - 1]);
            }
        }
    }
    this.checkFunction.graph = 1;
};

DistinctiveObject.prototype.deleteDistanceLine = function() {
    for (var i = 0; i < this.obj.length; i++) {
        while (this.obj_line[i].length != 0) {
            scene.remove(this.obj_line[i].pop());
        }
    }
    this.checkFunction.graph = 0;
};

DistinctiveObject.prototype.updateDistanceLine = function() {
    for (var i = 0; i < this.obj.length; i++) {
        while (this.obj_line[i].length != 0) {
            scene.remove(this.obj_line[i].pop());
        }
        for (var j = 0; j < this.obj.length; j++) {
            if (j - i > 0) {
                var lineGeometry = new THREE.Geometry();
                lineGeometry.vertices.push(this.obj[i].position);
                lineGeometry.vertices.push(this.obj[j].position);

                var line = new THREE.Line(lineGeometry,
                    new THREE.LineBasicMaterial({
                        lineWidth: 20
                    }));
                line.geometry.verticesNeedUpdate = true;
                line.geometry.lineDistancesNeedsUpdate = true;
                this.obj_line[i].push(line);
                scene.add(this.obj_line[i][this.obj_line[i].length - 1]);
            }
        }
    }
};

DistinctiveObject.prototype.calcDistance = function(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2) + Math.pow(p.z - q.z, 2) / 1000);
};

/**
 * ボタンクリック時のアクション
 *
 * @param {Object}
 *            obj
 */
DistinctiveObject.prototype.buttonClick = function(obj) {
    switch (obj.value) {
        case "flash":
            if (this.checkFunction.flash == 0) {
                this.checkFunction.flash = 1;
                obj.innerHTML = "点滅 ON";
            } else {
                this.checkFunction.flash = 0;
                obj.innerHTML = "点滅 OFF";
            }
            break;
        case "rotateMove":
            if (this.checkFunction.rotateMove == 0) {
                this.checkFunction.rotateMove = 1;
                obj.innerHTML = "回転移動 ON";
            } else {
                this.checkFunction.rotateMove = 0;
                obj.innerHTML = "回転移動 OFF";
            }
            break;
        case "rotate":
            if (this.checkFunction.rotate == 0) {
                this.checkFunction.rotate = 1;
                obj.innerHTML = "回転 ON";
            } else {
                this.checkFunction.rotate = 0;
                obj.innerHTML = "回転 OFF";
            }
            break;
        case "vibration":
            if (this.checkFunction.vibration == 0) {
                this.checkFunction.vibration = 1;
                obj.innerHTML = "振動 ON";
            } else {
                this.checkFunction.vibration = 0;
                obj.innerHTML = "振動 OFF";
            }
            break;
        case "graph":
            if (this.checkFunction.graph == 0) {
                this.createDistanceLine();
                obj.innerHTML = "グラフ ON"
            } else {
                this.deleteDistanceLine();
                obj.innerHTML = "グラフ OFF"
            }
            break;
        case "reset":
            this.resetPosition();
            if (this.checkFunction.graph == 1) {
                this.updateDistanceLine();
            }
            break;
    }
};


/**
 * ボタンクリック時のアクションのコントローラ
 */
DistinctiveObject.prototype.functionControll = function() {
    if (this.checkFunction.flash == 1) {
        this.flashDistinctiveObject();
    }
    if (this.checkFunction.rotateMove == 1) {
        this.rotateMoveDistinctiveObject();
        if (this.checkFunction.graph == 1) {
            this.updateDistanceLine();
        }
    }
    if (this.checkFunction.rotate == 1) {
        this.rotateDistinctiveObject();
    }
    if (this.checkFunction.vibration == 1) {
        this.vibrateDistinctiveObject();
        if (this.checkFunction.graph == 1) {
            this.updateDistanceLine();
        }
    }
};

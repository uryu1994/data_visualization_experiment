/**
 * @author uryu1994
 */

/**
 * CubeObjectに変化をもたらせるエフェクト
 * @param  {CubeObject} cube 立方体モデル
 * @param  {number}     n    変化をもたらせる番号
 * @return {CubeObject}      変化したCubeObjectを返す
 */
function rotateMoveObject(cube, n) {
    /* x軸の時計回り */
    if (n == 0) {
        cube.obj.position.y =
            Math.cos(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y -
            Math.sin(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z;
        cube.obj.position.z =
            Math.sin(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y +
            Math.cos(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z;
    /* y軸の時計回り */
    } else if (n == 1) {
        cube.obj.position.x =
            Math.cos(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x +
            Math.sin(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z;
        cube.obj.position.z =
            Math.cos(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z -
            Math.sin(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x;
    /* z軸の時計回り */
    } else if (n == 2) {
        cube.obj.position.x =
            Math.cos(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x -
            Math.sin(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y;
        cube.obj.position.y =
            Math.sin(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x +
            Math.cos(cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y;
    /* x軸の反時計回り */
    } else if (n == 3) {
        cube.obj.position.y =
            Math.cos(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y -
            Math.sin(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z;
        cube.obj.position.z =
            Math.sin(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y +
            Math.cos(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z;
    /* y軸の反時計回り */
    } else if (n == 4) {
        cube.obj.position.x =
            Math.cos(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x +
            Math.sin(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z;
        cube.obj.position.z =
            Math.cos(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.z -
            Math.sin(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x;
    /* z軸の反時計回り */
    } else if (n == 5) {
        cube.obj.position.x =
            Math.cos(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x -
            Math.sin(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y;
        cube.obj.position.y =
            Math.sin(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.x +
            Math.cos(-cube.time.rotateMoveTime * (Math.PI / 180)) * cube.obj_pos.y;
    }

    cube.time.rotateMoveTime++;

    return cube;
}

/**
 * 物体の回転移動
 * @param  {number}     cx   x軸方向の回転
 * @param  {number}     cy   y軸方向の回転
 * @param  {number}     cz   z軸方向の回転
 * @param  {CubeObject} cube 変化させるCubeObject
 * @return {CubeObject} cube 変化したCubeObjectを返す
 */
function rotateObject(cx, cy, cz, cube) {
    if (cx == 1) {
        cube.obj.rotation.x += 0.1;
    } else if (cx == -1) {
        cube.obj.rotation.x -= 0.1;
    }

    if (cy == 1) {
        cube.obj.rotation.y += 0.1;
    } else if (cy == -1) {
        cube.obj.rotation.y -= 0.1;
    }

    if (cz == 1) {
        cube.obj.rotation.y += 0.1;
    } else if (cz == -1) {
        cube.obj.rotation.z -= 0.1;
    }

    return cube;
}
/**
 * 環境光の色を周期的に変化させる
 * @param  {CubeObject} cube 変化させるCubeObject
 * @return {CubeObject}      変化したCubeObjectを返す
 */
function changeColor(cube) {
    cube.obj.material.color.setRGB(
        Math.pow(Math.sin(cube.time.changeColorTime * (Math.PI / 180)), 2),
        Math.pow(Math.cos(cube.time.changeColorTime * (Math.PI / 180)), 2),
        Math.pow(Math.sin(cube.time.changeColorTime * (Math.PI / 180)), 2)
    );
    cube.time.changeColorTime++;

    return cube;
}

/**
 * 鏡面反射光の色を周期的に変化させる
 * @param  {CubeObject} cube 変化させるCubeObject
 * @return {CubeObject}      変化したCubeObjectを返す
 */
function changeSpecular(cube) {
    cube.obj.material.specular.setRGB(
        Math.pow(Math.sin(cube.time.changeSpecularTime * (Math.PI / 180)), 2),
        Math.pow(Math.cos(cube.time.changeSpecularTime * (Math.PI / 180)), 2),
        Math.pow(Math.sin(cube.time.changeSpecularTime * (Math.PI / 180)), 2)
    );
    cube.time.changeSpecularTime++;
    return cube;
}

/** 周期的に点滅させる
 * @param  {CubeObject} cube    変化させるCubeObject
 * @param  {number}     helz    時間周波数
 * @return {CubeObject} cube    変化したCubeObjectを返す
 */
function flashObject(cube, helz) {
    var period = periodToFpsPeriod(helzToPeriod(helz));
    cube.obj.material.shininess = Math.cos(cube.time.flashTime * (Math.PI / 180)) * 255;
    cube.time.flashTime += period;
    return cube;
}

/**
 * 物体を振動させる
 * @param  {CubeObject} cube 振動させるCubeObject
 * @return {CubeObject}      振動させた後のCubeObjectを返す
 */
function vibrateObject(cube) {
    cube.obj.position.set(
        cube.obj_pos.x + 5 * (Math.random() * 2 - 1),
        cube.obj_pos.y + 5 * (Math.random() * 2 - 1),
        cube.obj_pos.z + 5 * (Math.random() * 2 - 1)
    );
    return cube;
}

/**
 * 物体を直線方向へ移動させる
 * @param  {CubeObject} cube   移動させる物体
 * @param  {number}     x      X軸方向に動かすかどうかの判定
 * @param  {number}     y      Y軸方向に動かすかどうかの判定
 * @param  {number}     z      Z軸方向に動かすかどうかの判定
 * @param  {number}     helz   時間周波数
 * @return {CubeObject}        移動後の情報が記録された物体を返す
 */
function moveStraightObject(cube, x, y, z, helz) {

    var period = periodToFpsPeriod(helzToPeriod(helz));
    /* X軸方向 */
    if (x == 1) {
        cube.obj.position.x += period;
    } else if (x == -1) {
        cube.obj.position.x -= period;
    }
    /* Y軸方向 */
    if (y == 1) {
        cube.obj.position.y += period;
    } else if (y == -1) {
        cube.obj.position.y -= period;
    }
    /* Z軸方向 */
    if (z == 1) {
        cube.obj.position.z += period;
    } else if (z == -1) {
        cube.obj.position.z -= period;
    }

    return cube;
}

/**
 * 物体を平行に往復移動させる
 * @param  {CubeObject} cube   移動させる物体
 * @param  {number}     x      x軸方向(1で正の方向, -1で負の方向)
 * @param  {number}     y      y軸方向(1で正の方向, -1で負の方向)
 * @param  {number}     z      z軸方向(1で正の方向, -1で負の方向)
 * @param  {number}     helz   時間周波数(Hz)
 * @param  {number}     width  往復する幅(初期位置から)
 * @return {CubeObject}        座標が変わった後の物体
 */
function moveStraightRepeatObject(cube, x, y, z, helz, width) {
    // 周期として使える形に変換
    var period = periodToFpsPeriod(helzToPeriod(helz));
    /* x軸方向 */
    if (x == 1) {
        cube.obj.position.x = width * Math.sin(
            period * cube.time.moveStraightRepeatTime * (Math.PI / 180)
        ) + cube.obj_pos.x;
    } else if (x == -1) {
        cube.obj.position.x = width * Math.sin(
            -period * cube.time.moveStraightRepeatTime * (Math.PI / 180)
        ) + cube.obj_pos.x;
    }

    /* y軸方向 */
    if (y == 1) {
        cube.obj.position.y = width * Math.sin(
            period * cube.time.moveStraightRepeatTime * (Math.PI / 180)
        ) + cube.obj_pos.y;
    } else if (y == -1) {
        cube.obj.position.y = width * Math.sin(
            -period * cube.time.moveStraightRepeatTime * (Math.PI / 180)
        ) + cube.obj_pos.y;
    }

    /* z軸方向 */
    if (z == 1) {
        cube.obj.position.z = width * Math.sin(
            period * cube.time.moveStraightRepeatTime * (Math.PI / 180)
        ) + cube.obj_pos.z;
    } else if (z == -1) {
        cube.obj.position.z = width * Math.sin(
            -period * cube.time.moveStraightRepeatTime * (Math.PI / 180)
        ) + cube.obj_pos.z;
    }

    cube.time.moveStraightRepeatTime++;
    return cube;
}

/**
 * cubeの大きさを拡大・縮小する
 * @param  {CubeObject} cube   拡大・縮小させる物体
 * @param  {number}     mode   1で拡大、-1で縮小
 * @param  {number}     period 周期
 * @param  {number}     width  拡大・縮小率
 * @return {CubeObject}        大きさが変化した後の物体
 */
function changeScale(cube, mode, period, width) {
    period = periodToFpsPeriod(period);
    if(mode == 1) {
        cube.obj.scale.set(
            width * Math.pow(Math.sin(period * cube.time.changeScaleTime * (Math.PI/180)), 2) + 1,
            width * Math.pow(Math.sin(period * cube.time.changeScaleTime * (Math.PI/180)), 2) + 1,
            width * Math.pow(Math.sin(period * cube.time.changeScaleTime * (Math.PI/180)), 2) + 1
        );
    } else if(mode == -1) {
        cube.obj.scale.set(
            1 - Math.pow(Math.sin(period * cube.time.changeScaleTime * (Math.PI/180)), 2)/width,
            1 - Math.pow(Math.sin(period * cube.time.changeScaleTime * (Math.PI/180)), 2)/width,
            1 - Math.pow(Math.sin(period * cube.time.changeScaleTime * (Math.PI/180)), 2)/width
        );
    }

    cube.time.changeScaleTime++;
    return cube;
}

/**
 * 周期をfpsに応じた周期に変換
 * @param  {Number} period 周期
 * @return {Number}        fpsに応じた周期を返す
 */
function periodToFpsPeriod(period) {
    return 360 / (period * 60);
}

/**
 * 時間周波数(Hz)を周期(s)に変換
 * @param  {number} helz 時間周波数(Hz)
 * @return {number}      周期(s)
 */
function helzToPeriod(helz) {
    return 1.00 / helz;
}

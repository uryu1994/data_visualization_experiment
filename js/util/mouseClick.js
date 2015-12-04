function initEvent() {
    canvasFrame.addEventListener('mousedown', onDocumentMouseDown, false);
    var ml;
    var mt;
    $(function() {
        ml = 155;
        mt = 10;
    })

    function onDocumentMouseDown(event) {
        var mx = ((event.clientX - ml) / canvasFrame.clientWidth) * 2 - 1;
        var my = -((event.clientY - mt) / canvasFrame.clientHeight) * 2 + 1;

        console.log(ml);

        var vector = new THREE.Vector3(mx, my, 0.5);

        var projector = new THREE.Projector();

        vector.unproject(mainCameraObject.camera);

        vector = vector.sub(mainCameraObject.camera.position).normalize();

        var raycaster = new THREE.Raycaster(mainCameraObject.camera.position, vector);

        var intersects = raycaster.intersectObjects(rayReceiveObjects);
        if (intersects.length > 0) {
            rayReceiveObjects.some(function(v, i) {
                if (v == intersects[0].object) {
                    rayReceiveObjects.splice(i, 1);
                }

            });
            scene.remove(intersects[0].object);
        } else {
        }
    }
}

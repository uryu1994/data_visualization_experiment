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

        var vector = new THREE.Vector3(mx, my, 0.5);

        var projector = new THREE.Projector();

        vector.unproject(mainCameraObject.camera);

        vector = vector.sub(mainCameraObject.camera.position).normalize();

        var raycaster = new THREE.Raycaster(mainCameraObject.camera.position, vector);
        var checkedColor = new THREE.Color("rgb(255, 0, 0)");
        var noCheckColor = new THREE.Color("rgb(255, 255, 255)");

        var intersects = raycaster.intersectObjects(rayReceiveObjects);
        if (intersects.length > 0) {
            if(intersects[0].object.clicked == 0) {
                intersects[0].object.material.color = checkedColor;
                intersects[0].object.clicked = 1;
            } else {
                intersects[0].object.material.color = noCheckColor;
                intersects[0].object.clicked = 0;
            }
        } else {
        }
    }
}

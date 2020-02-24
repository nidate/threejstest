const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1);
scene.add(light);

// 地面を作成
scene.add(new THREE.GridHelper());
scene.add(new THREE.AxesHelper());

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({
  color: parseInt(0x999999 + 0x555555 * Math.random())
});
const cube = new THREE.Mesh(geometry, material);


group.add(cube);


const resetCamera = () => {
  camera.position.z = 5;
  camera.position.x = 0;
  camera.position.y = 10;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}
const resetRotation = (obj) => {
  obj.rotation.x = 0;
  obj.rotation.y = 0;
  obj.rotation.z = 0;
}

resetCamera();
resetRotation(group);

function main() {
  renderer.render(scene, camera);
  requestAnimationFrame(main);
}
main();

document.addEventListener('mousemove', event => {
  //console.log(event);
});

// 二本指ドラッグで視点移動
document.addEventListener('wheel', ev => {
  const V = 0.1;
  camera.position.x += ev.deltaX * V;
  if (ev.ctrlKey) {
    camera.position.y += ev.deltaY * V;
  } else {
    camera.position.z += ev.deltaY * V;
  }
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  ev.preventDefault();
});
window.addEventListener('keydown', function(event) {
  // ESC
  if (event.keyCode === 27) {
    resetCamera();
  }
});

// カーソルでオブジェクト回転
window.addEventListener('keydown', function(event) {
  console.log(event.keyCode);
  const V = Math.PI / 12;
  switch (event.keyCode) {
    case 27: // ESC
      resetRotation(group);
      break
    case 37: // ←
      group.rotation.y += V;
      break;
    case 38: // ↑
      group.rotation.x -= V;
      break;
    case 39: // →
      group.rotation.y -= V;
      break;
    case 40: // ↓
      group.rotation.x += V;
      break;
  }
});

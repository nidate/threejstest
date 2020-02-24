const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1);
scene.add(light);

// 地面を作成
scene.add(new THREE.GridHelper(100, 100, 100));
// x-赤, Y-緑, Z-青
scene.add(new THREE.AxesHelper(100, 100, 100));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const group = new THREE.Group();
scene.add(group);

const resetCamera = () => {
  camera.position.z = 10;
  camera.position.x = 0;
  camera.position.y = 10;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
};
const resetRotation = obj => {
  obj.rotation.x = 0;
  obj.rotation.y = 0;
  obj.rotation.z = 0;
};

resetCamera();
resetRotation(group);

function createCube(width, height, depth) {
  const geometry = new THREE.BoxBufferGeometry(width, height, depth);
  const material = new THREE.MeshLambertMaterial({
    color: parseInt(0x999999 + 0x555555 * Math.random()),
    transparent: true,
    opacity: 0.8
  });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
let cube = createCube(10, 13, 2.5);
group.add(cube);
cube = createCube(10, 13, 2.5);
cube.position.x += 10;
group.add(cube);
cube = createCube(10, 13, 2.5);
cube.position.y += 13;
group.add(cube);
cube = createCube(10, 13, 2.5);
cube.position.z += 2.5;
group.add(cube);

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
      break;
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

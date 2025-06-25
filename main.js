const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0xdddddd })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// "City" block
const buildings = [];
for (let i = 0; i < 20; i++) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, Math.random() * 3 + 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x0077ff })
  );
  box.position.set(Math.random() * 20 - 10, box.geometry.parameters.height / 2, Math.random() * 20 - 10);
  scene.add(box);
  buildings.push(box);
}

// "Hospital" building
const hospital = new THREE.Mesh(
  new THREE.BoxGeometry(2, 3, 2),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
hospital.position.set(8, 1.5, -8);
scene.add(hospital);

// Initial camera position
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Animate fly-to
let fly = false;
let t = 0;
const duration = 100;
const startPos = new THREE.Vector3();
const endPos = new THREE.Vector3(10, 5, -12);
const startLook = new THREE.Vector3();
const endLook = new THREE.Vector3(8, 1.5, -8);

document.getElementById('flyButton').addEventListener('click', () => {
  startPos.copy(camera.position);
  startLook.copy(camera.getWorldDirection(new THREE.Vector3()).add(camera.position));
  fly = true;
  t = 0;
});

function animate() {
  requestAnimationFrame(animate);

  if (fly && t < 1) {
    t += 1 / duration;
    const pos = new THREE.Vector3().lerpVectors(startPos, endPos, t);
    const look = new THREE.Vector3().lerpVectors(startLook, endLook, t);
    camera.position.copy(pos);
    camera.lookAt(look);
    if (t >= 1) fly = false;
  }

  renderer.render(scene, camera);
}

animate();

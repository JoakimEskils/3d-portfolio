import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const torusTexture = new THREE.TextureLoader().load('gold-surface-texture-textured.jpeg');
const torusNormalTexture = new THREE.TextureLoader().load('gold.jpeg');
const geometry = new THREE.TorusGeometry(12, 2.6, 8, 50);
const material = new THREE.MeshStandardMaterial({ color: 0xba7449, metalness: 0.2, roughness: 0.7, map: torusTexture, normalMap: torusNormalTexture });

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers




function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const backgroundTexture = new THREE.TextureLoader().load('bg.jpeg');
scene.background = backgroundTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('profile.jpeg');

const jeff = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture, side: THREE.DoubleSide }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('ocean2.jpeg');
const normalTexture = new THREE.TextureLoader().load('ocean3.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;

  if(camera.position.z < 1) {
    jeff.rotation.y = 0;
  }

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  moon.rotation.x += 0.05;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
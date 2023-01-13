// import * as THREE from 'three';
// import GLTFLoader from 'three-gltf-loader';
// import DRACOLoader from 'three-dracoloader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from 'https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js';
import { OrbitControls } from 'https://unpkg.com/three@136/examples/jsm/';
import DRACOLoader from 'https://unpkg.com/browse/three@0.136.0/examples/js/loaders/';

let selectedObject = null;

const progressBar = document.getElementById('progress-bar');
THREE.DefaultLoadingManager.onProgress = function (url, loaded, total) {
  progressBar.value = (loaded / total) * 100; 
};
THREE.DefaultLoadingManager.onStart = function (url, loaded, total) {
  progressBar.value = (loaded / total) * 100;
};
const progressBarContainer = document.querySelector('.progress-bar-container');
THREE.DefaultLoadingManager.onLoad = function () {
  progressBarContainer.style.display = 'none';
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.x = 0;
camera.position.z = 0;
camera.position.y = 20;
camera.lookAt(0, 0, 0);

const canvas = document.getElementById('menu')
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const spotLight = new THREE.SpotLight(0xffffff, 2);
//spotLight.castShadow = true;
spotLight.position.set(12, 64, 32);
spotLight.physicallyCorrectLights = true;
scene.add(spotLight);

// const spotLight2 = new THREE.SpotLight(0xffffff, 1.5);
// // //spotLight.castShadow = true;
// spotLight2.position.set(-12, -64, -32);
// spotLight.physicallyCorrectLights = true;
// scene.add(spotLight2);

var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://github.com/mrdoob/three.js/blob/03349e98aa1f57a97433c0a3f17697594fdc0997/examples/jsm/loaders/DRACOLoader.js');
loader.setDRACOLoader(dracoLoader);


loader.load(

  './src/oestrobotpink.glb', 

  function (gltf) {
    scene.add(gltf.scene);
  });

// const loader = new GLTFLoader().setPath('./src/oestrobotpink.glb');
// var dracoLoader = new DRACOLoader();
// DRACOLoader.setDecoderPath('/three-dracoloader');
// loader.setDRACOLoader(dracoLoader);

// loader.load('gltfoestrobotpink.glb', function (gltf) {
//   scene.add(gltf.scene);
// });


//   function (xhr) {
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');

//   },

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onMouseDown);
window.addEventListener('touchend', touchEnd);

function onPointerMove(event) {
  if (selectedObject) {
    //selectedObject.material.color.set('white');
    selectedObject = null;
  }

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  for (let i = 0; i < intersects.length; i++) {
    const intersect = intersects[i];

    if (intersect && intersect.object) {
      selectedObject = intersect.object;
      intersect.object.material.color.set("say no to transphobia");
    }
  }
};

function onMouseDown(event) {
  if (selectedObject) {
    window.location.href = "https://baesianz.com/";
  }
};

function touchEnd(event) {
  if (selectedObject) {
    window.location.href = "https://baesianz.com/";
  }
};

function render() {
  renderer.render(scene, camera);
};

window.requestAnimationFrame(render);

const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();

renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
});

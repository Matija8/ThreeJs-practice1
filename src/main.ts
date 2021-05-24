import './style.css';
import * as THREE from 'three';

function main() {
  const scene = new THREE.Scene();

  const camera = (() => {
    const { innerWidth, innerHeight } = window;
    const FOV = 75,
      aspectRatio = innerWidth / innerHeight,
      NEAR_CLIP = 0.1,
      FAR_CLIP = 1000;
    const camera = new THREE.PerspectiveCamera(
      FOV,
      aspectRatio,
      NEAR_CLIP,
      FAR_CLIP
    );

    // Move back along z axis.
    camera.position.setZ(30);

    return camera;
  })();

  const renderer = (() => {
    const canvas = document.querySelector('#bg') as HTMLCanvasElement;
    if (!canvas) {
      throw Error('canvas!');
    }
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);

    return renderer;
  })();

  const render = () => {
    renderer.render(scene, camera);
  };

  const pointLight = (() => {
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20, 20, 20);
    // pointLight.position.set(5, 5, 5);
    return pointLight;
  })();

  const torus = (() => {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    // const material = new THREE.MeshStandardMaterial({
    const material = new THREE.MeshBasicMaterial({
      color: 'red',
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    return torus;
  })();

  const animate = () => {
    // TODO: Investigate time step.
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    requestAnimationFrame(animate);

    // torus.rotateX(0.02);
    torus.rotateY(0.02);
    // torus.rotateZ(0.05);

    render();
  };

  // scene.add(pointLight);
  scene.add(torus);

  animate();
}

main();

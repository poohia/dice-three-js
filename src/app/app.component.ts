import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import Octahedron from './Octahedron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dice-three-js';
  width = 128 * 2;
  height = 160 * 2;

  ngOnInit(): void {
    this.generateDiceSix();
    this.generateDiceHeightChatGPTConcept();
    this.generateDiceHeightChatGPT();
    this.generateDiveOctahedron();
  }

  private generateDiceSix() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.width, this.height);

    document.getElementById('dice-six')?.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const loader = new THREE.TextureLoader();

    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/1.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/2.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/3.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/4.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/5.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/6.png') }),
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    renderer.setAnimationLoop(() => {
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    });
  }

  // C'est ce que CHATGPT m'a donné pour faire un OctahedronGeometry mais sa ne fonctionne pas
  private generateDiceHeightChatGPTConcept() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.width, this.height);
    renderer.setClearColor(0x000000, 0);

    document
      .getElementById('dice-height-chatgpt-concept')
      ?.appendChild(renderer.domElement);

    const geometry = new THREE.OctahedronGeometry(2);
    const loader = new THREE.TextureLoader();
    const materials = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });

    const octahedron = new THREE.Mesh(geometry, materials);
    scene.add(octahedron);
    const rotationSpeedX = Math.random() * 0.2 - 0.1; // Des valeurs entre -0.1 et 0.1
    const rotationSpeedY = Math.random() * 0.2 - 0.1;
    const rotationSpeedZ = Math.random() * 0.2 - 0.1;
    renderer.setAnimationLoop(() => {
      octahedron.rotation.x += rotationSpeedX;
      octahedron.rotation.y += rotationSpeedY;
      octahedron.rotation.z += rotationSpeedZ;
      renderer.render(scene, camera);
    });
  }

  // C'est ce que CHATGPT m'a donné pour faire un OctahedronGeometry mais sa ne fonctionne pas
  private generateDiceHeightChatGPT() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.width, this.height);
    renderer.setClearColor(0x000000, 0);

    document
      .getElementById('dice-height-chatgpt')
      ?.appendChild(renderer.domElement);

    const geometry = new THREE.OctahedronGeometry(2);
    const loader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/1.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/2.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/3.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/4.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/5.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/6.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/7.png') }),
      new THREE.MeshBasicMaterial({ map: loader.load('assets/image/8.png') }),
    ];

    const octahedron = new THREE.Mesh(geometry, materials);
    const light = new THREE.DirectionalLight(0xffffff, 0.1);
    light.position.setScalar(1);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.9));
    scene.add(octahedron);
    renderer.setAnimationLoop(() => {
      octahedron.rotation.x += 0.1;
      octahedron.rotation.y += 0.1;
      renderer.render(scene, camera);
    });
  }

  private generateDiveOctahedron() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.width, this.height);
    renderer.setClearColor(0x000000, 0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.setScalar(1);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.9));

    document
      .getElementById('dice-height-chatgpt-concept')
      ?.appendChild(renderer.domElement);

    const tl = new THREE.TextureLoader();
    const m = [
      '1.png',
      '2.png',
      '3.png',
      '4.png',
      '5.png',
      '6.png',
      '7.png',
      '8.png',
    ].map((tex) => {
      let path = '/assets/image/';
      return new THREE.MeshLambertMaterial({ map: tl.load(path + tex) });
    });

    const octahedron = new Octahedron(4, m);
    scene.add(octahedron);
    renderer.setAnimationLoop(() => {
      octahedron.update();
      renderer.render(scene, camera);
    });
  }
}

import * as THREE from 'three';

export default class Octahedron extends THREE.Mesh {
  private rotationSpeedX: number;
  private rotationSpeedY: number;
  private rotationSpeedZ: number;
  constructor(radius: number, materials: THREE.MeshBasicMaterial[]) {
    let n = new THREE.Vector3(0, 1, 0);
    let a = Math.PI * 0.5;
    let c = new THREE.Vector2();
    let uv = new THREE.Vector2();
    let a2 = (Math.PI * 2) / 3;
    let pts = [];
    let uvs = [];
    for (let i = 0; i < 4; i++) {
      // top
      pts.push(
        new THREE.Vector3(0, 1, 0).applyAxisAngle(n, a * i),
        new THREE.Vector3(0, 0, 1).applyAxisAngle(n, a * i),
        new THREE.Vector3(1, 0, 0).applyAxisAngle(n, a * i)
      );
      for (let j = 0; j < 3; j++) {
        uv.set(0, 0.5)
          .rotateAround(c, a2 * j)
          .addScalar(0.5);
        uvs.push(uv.x, uv.y);
      }
      //bottom
      pts.push(
        new THREE.Vector3(0, -1, 0).applyAxisAngle(n, a * i),
        new THREE.Vector3(1, 0, 0).applyAxisAngle(n, a * i),
        new THREE.Vector3(0, 0, 1).applyAxisAngle(n, a * i)
      );
      for (let j = 0; j < 3; j++) {
        uv.set(0, -0.5)
          .rotateAround(c, a2 * j)
          .addScalar(0.5);
        uvs.push(uv.x, uv.y);
      }
    }
    let g = new THREE.BufferGeometry().setFromPoints(pts);
    g.scale(radius, radius, radius);
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    g.computeVertexNormals();
    let groupStart = 0;
    for (let i = 0; i < 8; i++) {
      g.addGroup(groupStart, 3, i);
      groupStart += 3;
    }

    super(g, materials);
    this.rotationSpeedX = Math.random() * 0.2 - 0.1; // Des valeurs entre -0.1 et 0.1
    this.rotationSpeedY = Math.random() * 0.2 - 0.1;
    this.rotationSpeedZ = Math.random() * 0.2 - 0.1;
  }

  update() {
    this.rotation.x += this.rotationSpeedX;
    this.rotation.y += this.rotationSpeedY;
    this.rotation.z += this.rotationSpeedZ;
  }
}

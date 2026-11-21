import * as THREE from "three";

// 컴포넌트를 다시 마운트할 때 이전 장면의 GPU 자원이 남지 않도록 해제한다.
export function disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer, environmentTarget?: THREE.WebGLRenderTarget) {
 const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
 scene.traverse(object => {
  if(object instanceof THREE.Mesh || object instanceof THREE.Sprite || object instanceof THREE.Line || object instanceof THREE.Points) {
   geometries.add(object.geometry);
   for(const material of (Array.isArray(object.material)?object.material:[object.material])) {
    materials.add(material);
    for(const value of Object.values(material)) if(value instanceof THREE.Texture) textures.add(value);
   }
  }
  if (object instanceof THREE.DirectionalLight || object instanceof THREE.SpotLight || object instanceof THREE.PointLight) object.shadow.dispose();
 });
 geometries.forEach(value=>value.dispose());
 materials.forEach(value=>value.dispose());
 textures.forEach(value=>value.dispose());
 environmentTarget?.dispose();
 renderer.dispose();
 renderer.domElement.remove();
}

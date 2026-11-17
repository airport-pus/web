// React remounts must release the previous WebGL scene and GPU allocations.
export function disposeScene(scene, renderer, environmentTarget) {
 const geometries = new Set(), materials = new Set(), textures = new Set();
 scene.traverse(object => {
  if(object.geometry) geometries.add(object.geometry);
  if(object.material) {
   for(const material of (Array.isArray(object.material)?object.material:[object.material])) {
    materials.add(material);
    for(const value of Object.values(material)) if(value?.isTexture) textures.add(value);
   }
  }
  object.shadow?.dispose();
 });
 geometries.forEach(value=>value.dispose());
 materials.forEach(value=>value.dispose());
 textures.forEach(value=>value.dispose());
 environmentTarget?.dispose();
 renderer.dispose();
 renderer.domElement.remove();
}

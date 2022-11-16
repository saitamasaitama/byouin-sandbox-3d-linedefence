const scene = new THREE.Scene();
      // カメラ
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 3000;
 alert(THREE.CSS3DObject)
const catObj = new THREE.CSS3DObject($("#cat").get());
scene.add(catObj);

alert(9)
      // レンダラー
const renderer = new THREE.CSS3DRenderer();
const canvas = $(renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight);
$("body").append(canvas);
      // 描画関数
     
 function render() {
 
 	requestAnimationFrame(render);
  	renderer.render(scene, camera);
 }

      // 描画
  render();

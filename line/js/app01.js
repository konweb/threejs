window.addEventListener("DOMContentLoaded", function(){
	/* カメラを用意
	 * THREE.PerspectiveCamera(画角, 縦横比, クリッピング手前, クリッピング奥);
	 * クリッピング手前からクリッピング奥までが描画される
	*/
	var width  = window.innerWidth,
			height = window.innerHeight,
			fov    = 80,
			aspect = width / height,
			near   = 1,
			fav    = 1000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, fav);
	// z方向に500ずらす
	camera.position.z = 500;

	/*
	 * シーンの準備
	*/
	var scene = new THREE.Scene();


	/*
	 * マテリアルの作成
	*/
	var geometry = new THREE.Geometry(),
			material = new THREE.LineBasicMaterial({color: 0x0000ff});

	geometry.vertices.push(
		new THREE.Vector3(-100,0,0),
		new THREE.Vector3(0,100,0),
		new THREE.Vector3(100,0,0)
	);

	var line = new THREE.Line(geometry, material);
	scene.add(line);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);
	renderer.render( scene, camera );
});
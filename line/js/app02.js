window.addEventListener("DOMContentLoaded", function(){
	console.log("load");
	/*
	 * カメラの準備
	 * THREE.PerspectiveCamera(画角, 縦横比, クリッピング手前, クリッピング奥);
	*/
	var width  = window.innerWidth,
			height = window.innerHeight,
			fov    = 80,
			aspect = width / height,
			near   = 1,
			fav    = 1000,
			camera = new THREE.PerspectiveCamera(fov, aspect, near, fav);

	// z方向に500ずらす
	camera.position.z = 500;

	/*
	 * シーンの生成
	*/
	var scene = new THREE.Scene();


	/*
	 * マテリアルの生成
	 * 複数ラインをシーンに追加
	*/
	for(var i = 0;i < 10;i++){
		var geometry = new THREE.Geometry(),
				material = new THREE.LineBasicMaterial({color: 0x0000ff});

		geometry.vertices.push(
			new THREE.Vector3(-100, 20 * i, 0),
			new THREE.Vector3(100, 20 * i, 0)
		);

		var line = new THREE.Line(geometry, material);
		scene.add(line);
	}

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);
	renderer.render(scene, camera);
});
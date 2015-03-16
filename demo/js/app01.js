var requestAnimationFrame = window.requestAnimationFrame ||
														window.mozRequestAnimationFrame ||
														window.webkitRequestAnimationFrame ||
														window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

window.addEventListener("DOMContentLoaded", function(){
	var renderer,carame,scene,mesh;
	init();
	animate();

	function init(){
		/* カメラを用意
		 * THREE.PerspectiveCamera(画角, 縦横比, クリッピング手前, クリッピング奥);
		 * クリッピング手前からクリッピング奥までが描画される
		*/
		var width  = window.innerWidth,
				height = window.innerHeight,
				fov    = 27,
				aspect = width / height,
				near   = 1,
				fav    = 4000;

		camera = new THREE.PerspectiveCamera(fov, aspect, near, fav);
		// z方向に500ずらす
		camera.position.z = 2750;

		/*
		 * シーンの準備
		*/
		scene = new THREE.Scene();


		/*
		 * マテリアルの作成
		*/
		var segments = 1000,
				geometry = new THREE.BufferGeometry(),
				material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors}),
				positions = new Float32Array(segments * 3),
				colors = new Float32Array(segments * 3),
				r = 800;

		for ( var i = 0; i < segments; i ++ ) {
			var x = Math.random() * r - r / 2,
					y = Math.random() * r - r / 2,
					z = Math.random() * r - r / 2;

			// positions
			positions[ i * 3 ] = x;
			positions[ i * 3 + 1 ] = y;
			positions[ i * 3 + 2 ] = z;

			// colors
			colors[ i * 3 ] = ( x / r ) + 0.5;
			colors[ i * 3 + 1 ] = ( y / r ) + 0.5;
			colors[ i * 3 + 2 ] = ( z / r ) + 0.5;
		}

		geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
		geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));
		geometry.computeBoundingSphere();


		mesh = new THREE.Line(geometry, material);
		scene.add(mesh);

		renderer = new THREE.WebGLRenderer({antialias: false});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		document.body.appendChild(renderer.domElement);
	}

	function animate(){
		requestAnimationFrame(animate);
		render();
	}

	function render(){
		var time = Date.now() * 0.001;
		mesh.rotation.x = time * 0.25;
		mesh.rotation.y = time * 0.5;
		renderer.render( scene, camera );
	}
});
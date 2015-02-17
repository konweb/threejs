(function() {
	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

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
			far    = 1000,
			camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	// z方向に500ずらす
	camera.position.z = 500;


	/* シーンの準備
	 * シーンは空間
	 * ここに様々なオブジェクトを詰め込んでいく
	*/
	var scene = new THREE.Scene();


	/* メッシュを作成
	 * メッシュはポリゴンの集合で作られたオブジェクト
	 * メッシュはジオメトリー(座標)とマテリアル(素材)で構成される
	*/

	// ジオメトリーの作成
	// THREE.CubeGeometry(横幅, 高さ, 奥行き, (横の分割数, 縦の分割数, 奥行きの分割数, 表面, sides));
	var geometry = new THREE.CubeGeometry(200, 200,200);

	// マテリアルの作成
	// THREE.MeshLambertMaterial({object});
	var material = new THREE.MeshLambertMaterial({color: 0x660000});

	// メッシュの作成
	var cubeMesh = new THREE.Mesh(geometry, material);


	/* メッシュをシーンに追加
	 * 作成したメッシュをシーンに追加するには、シーン.add(メッシュ)を使う
	*/
	scene.add(cubeMesh);


	/* 光源の作成
	 * 環境光		THREE.AmbientLight
	 * 平行光源 (無限遠光源)	THREE.DirectionalLight
	 * 点光源		THREE.PointLight
	 * スポットライト	THREE.SpotLight
	*/
	var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
	directionalLight.position.z = 3;


	/*
	 * 光源をシーンに追加
	 * メッシュの時と同様に、シーン.add(光源)で追加する
	*/
	scene.add(directionalLight);


	/* レンダラーを用意
	 * 実際に描画を行うための処理
	*/
	var renderer = new THREE.WebGLRenderer();

	// 大きさの定義
	// レンダラー.setSize(横幅, 高さ)で大きさを定義
	renderer.setSize( width, height);

	// DOMにcanvasを追加
	document.body.appendChild( renderer.domElement );


	/* レンダリング
	 * 描画処理
	 * レンダラー.render(シーン, カメラ)
	*/
	renderer.render(scene, camera);


	/* アニメーション
	 * 連続でレンダリングすることでアニメーションさせる
	*/
	function rendering(){
		cubeMesh.rotation.x += 0.01;
		cubeMesh.rotation.y += 0.01;
		renderer.render(scene, camera);
		requestAnimationFrame(rendering);
	}
	rendering();
});

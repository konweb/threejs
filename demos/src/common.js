(function(){
	var $nav = $(".nav"),
			$menu_bg = $(".menu-bg"),
			is_active = "is-active";

	$nav.on({
		mouseenter: function(){
			$(this).addClass(is_active);
			$menu_bg.addClass(is_active);
		},
		mouseleave: function(){
			$(this).removeClass(is_active);
			$menu_bg.removeClass(is_active);
		}
	});
})();
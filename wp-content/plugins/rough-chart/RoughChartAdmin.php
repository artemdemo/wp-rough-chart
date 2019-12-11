<?php

require_once('views/AdminView.php');
require_once('views/NewChartView.php');

use roughChart\views\AdminView;
use roughChart\views\NewChartView;

class RoughChartAdmin {
	private static $initiated = false;

	public static $chart_id_arg = 'chart_id';

	public static $menu_slug = 'rough_chart';

	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
	}

	public static function init_hooks() {
		self::$initiated = true;

		add_action( 'admin_menu', array( 'RoughChartAdmin', 'admin_menu' ) );
	}

	public static function admin_menu() {
		// https://developer.wordpress.org/plugins/administration-menus/sub-menus/
		add_submenu_page(
			'themes.php',
			'Rough Charts',
			'Rough Charts',
			'manage_options',
			RoughChartAdmin::$menu_slug,
			array( 'RoughChartAdmin', 'render_admin_view' )
		);
	}

	public static function render_admin_view() {
		if ( array_key_exists( RoughChartAdmin::$chart_id_arg, $_GET ) &&
		     $_GET[RoughChartAdmin::$chart_id_arg] == 'new' ) {
			$newChartView = new NewChartView();
			$newChartView->render();
		} else {
			$adminView = new AdminView();
			$adminView->render();
		}
	}

}

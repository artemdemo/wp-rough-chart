<?php

require_once('views/AdminView.php');
require_once('views/NewChartView.php');

use roughChart\views\AdminView;
use roughChart\views\NewChartView;

class RoughChartAdmin {
	private static $initiated = false;

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
		add_submenu_page(
			'themes.php',
			'Rough Charts',
			'Rough Charts',
			'manage_options',
			'rough_chart',
			array( 'RoughChartAdmin', 'render_admin_view' )
		);

		add_plugins_page(
			'Add new Rough Chart',
			'Add new Rough Chart',
			'manage_options',
			'rough_chart_add_new',
			array( 'RoughChartAdmin', 'render_add_new_view' )
		);
	}

	public static function render_admin_view() {
		$adminView = new AdminView();
		$adminView->render();
	}

	public static function render_add_new_view() {
		$newChartView = new NewChartView();
		$newChartView->render();
	}
}

<?php

require_once( 'views/AdminView.php' );
require_once( 'views/ChartView.php' );

use roughChart\views\AdminView;
use roughChart\views\ChartView;

class RoughChartAdmin {
	private static $initiated = false;

	public static $chart_id_arg = 'chart_id';
	public static $menu_slug = 'rough_chart';
	public static $js_slug = 'rough-charts-app';

	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
	}

	public static function init_hooks() {
		self::$initiated = true;

		add_action( 'admin_menu', array( 'RoughChartAdmin', 'admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( 'RoughChartAdmin', 'add_js_scripts' ) );
		add_action( 'wp_ajax_rough_chart_save_chart_data', array( 'RoughChartAdmin', 'save_chart_data' ) );
		add_action( 'wp_ajax_rough_chart_get_charts_data', array( 'RoughChartAdmin', 'get_charts' ) );
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

	public static function add_js_scripts() {
		wp_enqueue_script(
			self::$js_slug,
			plugin_dir_url( __FILE__ ) . 'app/build/js/rough-chart.js'
		);
		wp_localize_script(
			self::$js_slug,
			'__roughChartsApp_$8453',
			array(
				'nonce' => wp_create_nonce( self::$js_slug ),
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'plugin_url' => menu_page_url( self::$menu_slug, false ),
			)
		);
	}

	public static function save_chart_data() {
		$err = null;
		try {
			$chart = json_decode(
				stripcslashes( $_POST[ 'chart' ] ),
				true,
				512,
				JSON_THROW_ON_ERROR
			);
			$title = $chart['title'];
			unset($chart['title']);
			$result = RoughChartDB::add_chart( $title, json_encode( $chart ) );
			if ($result == 1) {
				wp_send_json( json_decode( $result ) );
			} else {
				$err = RoughChartErrorMsg::generalDBError();
			}
		} catch (JsonException $e) {
			$err = RoughChartErrorMsg::fromJsonException($e);
		}
		if ($err != null) {
			wp_send_json(
				$err -> toArray(),
				$err -> getStatus()
			);
		}
		die();
	}

	public static function get_charts() {
		$result = RoughChartDB::get_all_charts();
		wp_send_json( $result );
	}

	public static function render_admin_view() {
		$has_chart_id = isset( $_GET[ RoughChartAdmin::$chart_id_arg ] ) &&
		                !empty( $_GET[ RoughChartAdmin::$chart_id_arg ] );
		if ( array_key_exists( RoughChartAdmin::$chart_id_arg, $_GET ) && $has_chart_id ) {
			$chartView = new ChartView();
			$chartView -> render();
		} else {
			$adminView = new AdminView();
			$adminView -> render();
		}
	}

}

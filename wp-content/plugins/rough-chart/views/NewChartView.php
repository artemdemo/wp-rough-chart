<?php
namespace roughChart\views;
use RoughChartAdmin;

require_once( 'View.php' );

class NewChartView extends View {
	public static function get_url_to_add_new() {
		$link_args = array();
		$link_args[ RoughChartAdmin::$chart_id_arg ] = 'new';
		return add_query_arg(
			$link_args,
			menu_page_url( RoughChartAdmin::$menu_slug, false )
		);
	}

	public function __construct() {
		parent::__construct( 'new-chart-tmpl' );
	}
}

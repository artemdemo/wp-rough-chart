<?php
namespace roughChart\views;

use RoughChartDB;

require_once( 'View.php' );

class AdminView extends View {
	public static function get_charts() {
		return RoughChartDB::get_all_charts();
	}

	public function __construct() {
		parent::__construct( 'admin-tmpl' );
	}
}

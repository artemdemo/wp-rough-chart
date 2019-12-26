<?php
namespace roughChart\views;

require_once( 'View.php' );

class ChartView extends View {
	public function __construct() {
		parent::__construct( 'new-chart-tmpl' );
	}
}

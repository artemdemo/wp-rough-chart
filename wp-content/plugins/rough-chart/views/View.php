<?php
namespace roughChart\views;

class View {
	public static $text_domain = 'rough-chart';

	private $name = 'view';

	public function __construct( $name ) {
		$this->name = $name;
	}

	public function render() {
		load_plugin_textdomain( View::$text_domain );
		include( ROUGH_CHART_PLUGIN_DIR . 'views/templates/' . $this->name . '.php' );
	}
}

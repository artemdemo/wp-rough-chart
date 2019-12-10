<?php

class View {
	private $name = 'view';

	public function __construct( $name ) {
		$this->name = $name;
	}

	public function render() {
		include( ROUGH_CHART_PLUGIN_DIR . 'views/templates/' . $this->name . '.php' );
	}
}

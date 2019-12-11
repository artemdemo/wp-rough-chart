<?php
namespace roughChart\views;

require_once( 'View.php' );

class AdminView extends View {
	public function __construct() {
		parent::__construct( 'admin-tmpl' );
	}
}

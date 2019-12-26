<?php

require_once('RoughChartDB.php');
require_once('RoughChartErrorMsg.php');

class RoughChart {
	private static $initiated = false;

	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
	}

	private static function init_hooks() {
		self::$initiated = true;
	}

	public static function plugin_activation() {
		RoughChartDB::init_table();
	}

	public static function plugin_deactivation() {
		RoughChartDB::drop_table();
	}
}

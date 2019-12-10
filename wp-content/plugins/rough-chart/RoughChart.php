<?php

class RoughChart {
	private static $initiated = false;

	public static function init() {
		if (!self::$initiated) {
			self::init_hooks();
		}
	}

	private static function init_hooks() {
		self::$initiated = true;
	}

	public static function plugin_activation() {}

	public static function plugin_deactivation() {}
}

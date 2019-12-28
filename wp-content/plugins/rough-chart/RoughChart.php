<?php

require_once( 'models/DB.php' );
require_once( 'models/ErrorMsg.php' );

use roughChart\models\DB;

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
        DB::init_table();
    }

    public static function plugin_deactivation() {
        DB::drop_table();
    }
}

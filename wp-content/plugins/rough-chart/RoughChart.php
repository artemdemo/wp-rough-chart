<?php

require_once( 'models/DB.php' );
require_once( 'models/ErrorMsg.php' );
require_once( 'views/ShortcodeView.php' );

use roughChart\models\DB;
use roughChart\views\ShortcodeView;

/**
 * Class RoughChart
 */
class RoughChart {
    private static $initiated = false;

    public static $js_slug = 'rough-charts-app';

    public static function init() {
        if ( ! self::$initiated ) {
            self::init_hooks();
        }
    }

    private static function init_hooks() {
        self::$initiated = true;

        add_shortcode( 'roughchart', array( 'RoughChart', 'shortcode_roughchart' ) );
        add_action( 'wp_enqueue_scripts', array( 'RoughChart', 'add_js_scripts' ) );
    }

    public static function shortcode_roughchart( $atts ) {
        $chart_ref = shortcode_atts( array(
            'id' => -1,
            'title' => '',
        ), $atts );

        $shortcode_view = new ShortcodeView(
            $chart_ref['id'],
            $chart_ref['title']
        );

        return $shortcode_view -> render();
    }

    public static function add_js_scripts() {
        $build_folder = plugin_dir_url( __FILE__ ) . 'app/build/';
        wp_enqueue_script(
            self::$js_slug,
            $build_folder . 'js/rough-chart-shortcode.js',
            array(),
            ROUGH_CHART_VERSION
        );
    }

    public static function plugin_activation() {
        DB::init_table();
    }

    public static function plugin_deactivation() {
        DB::drop_table();
    }
}

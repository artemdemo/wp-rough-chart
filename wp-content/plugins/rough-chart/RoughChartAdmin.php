<?php

require_once( 'views/View.php' );

use roughChart\views\View;

class RoughChartAdmin {
    private static $initiated = false;

    public static $chart_id_arg = 'chart_id';
    public static $menu_slug = 'rough_chart';
    public static $js_slug = 'rough-charts-app';

    public static function init() {
        if ( ! self::$initiated ) {
            self::init_hooks();
        }
    }

    public static function init_hooks() {
        self::$initiated = true;

        add_action( 'admin_menu', array( 'RoughChartAdmin', 'admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( 'RoughChartAdmin', 'add_js_scripts' ) );
        add_action( 'wp_ajax_rough_chart_save_chart_data', array( 'RoughChartAdmin', 'save_chart_data' ) );
        add_action( 'wp_ajax_rough_chart_get_all_charts', array( 'RoughChartAdmin', 'get_all_charts' ) );
        add_action( 'wp_ajax_rough_chart_delete_chart', array( 'RoughChartAdmin', 'delete_chart' ) );
    }

    public static function admin_menu() {
        // https://developer.wordpress.org/plugins/administration-menus/sub-menus/
        add_submenu_page(
            'themes.php',
            'Rough Charts',
            'Rough Charts',
            'manage_options',
            RoughChartAdmin::$menu_slug,
            array( 'RoughChartAdmin', 'render_admin_view' )
        );
    }

    public static function add_js_scripts() {
        $build_folder = plugin_dir_url( __FILE__ ) . 'app/build/';
        wp_enqueue_script(
            self::$js_slug,
            $build_folder . 'js/rough-chart.js'
        );
        wp_localize_script(
            self::$js_slug,
            '__roughChartsApp_$8453',
            array(
                'nonce' => wp_create_nonce( self::$js_slug ),
                'ajax_url' => admin_url( 'admin-ajax.php' ),
                'plugin_url' => menu_page_url( self::$menu_slug, false ),
                'build_folder' => $build_folder,
            )
        );
    }

    public static function save_chart_data() {
        $err = null;
        try {
            $chart = json_decode(
                stripcslashes( $_POST[ 'chart' ] ),
                true,
                512,
                JSON_THROW_ON_ERROR
            );
            $title = $chart['title'];
            $type = $chart['type'];
            unset($chart['title']);
            unset($chart['type']);
            $result = RoughChartDB::add_chart( $title, $type, json_encode( $chart ) );
            if ($result == 1) {
                wp_send_json( json_decode( $result ) );
            } else {
                $err = RoughChartErrorMsg::generalDBError();
            }
        } catch ( JsonException $e ) {
            $err = RoughChartErrorMsg::fromJsonException( $e );
        }
        if ( $err != null ) {
            wp_send_json(
                $err -> toArray(),
                $err -> getStatus()
            );
        }
        die();
    }

    public static function get_all_charts() {
        $result = RoughChartDB::get_all_charts();
        wp_send_json( $result );
        die();
    }

    public static function delete_chart() {
        $err = null;
        $chart_id = intval( $_POST[ 'chart_id' ] );
        $result = RoughChartDB::delete_chart_by_id( $chart_id );
        if ($result == 1) {
            wp_send_json( json_decode( $result ) );
        } else {
            $err = RoughChartErrorMsg::generalDBError();
        }
        if ( $err != null ) {
            wp_send_json(
                $err -> toArray(),
                $err -> getStatus()
            );
        }
        die();
    }

    public static function render_admin_view() {
        $view = new View();
        $view -> render();
    }

}

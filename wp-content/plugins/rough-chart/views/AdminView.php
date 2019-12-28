<?php
namespace roughChart\views;

use RoughChartAdmin;
use RoughChartDB;

require_once( 'View.php' );

class AdminView extends View {
    public static function get_charts() {
        return RoughChartDB::get_all_charts();
    }

    public static function get_url_to_chart($chart_id) {
        $link_args = array();
        $link_args[ RoughChartAdmin::$chart_id_arg ] = $chart_id;
        return add_query_arg(
            $link_args,
            menu_page_url( RoughChartAdmin::$menu_slug, false )
        );
    }

    public function __construct() {
        parent::__construct( 'admin-tmpl' );
    }
}

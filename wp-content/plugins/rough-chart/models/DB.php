<?php

namespace roughChart\models;

class DB {
    private static $table_name = 'roughcharts';

    public static function get_table_name() {
        global $wpdb;
        return $wpdb->prefix . self::$table_name;
    }

    public static function init_table() {
        global $wpdb;
        $table_name = DB::get_table_name();
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
          id mediumint(9) NOT NULL AUTO_INCREMENT,
          title tinytext NOT NULL,
          chart_type tinytext NOT NULL,
          chart text NOT NULL,
          version tinytext NOT NULL,
          created datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
          last_updated datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
          PRIMARY KEY (id)
        ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }

    public static function drop_table() {
        global $wpdb;
        $table_name = DB::get_table_name();
        $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
    }

    public static function add_chart($title, $type, $chart_str) {
        global $wpdb;
        $table_name = DB::get_table_name();
        return $wpdb->insert(
            $table_name,
            array(
                'title' => $title,
                'chart_type' => $type,
                'chart' => $chart_str,
                'version' => ROUGH_CHART_VERSION,
                'created' => gmdate('Y-m-d H:i:s'),
                'last_updated' => gmdate('Y-m-d H:i:s'),
            )
        );
    }

    public static function update_chart($id, $chart_str) {
        global $wpdb;
        $table_name = DB::get_table_name();
        return $wpdb->update(
            $table_name,
            array(
                'chart' => $chart_str,
                'last_updated' => gmdate('Y-m-d H:i:s'),
            ),
            array(
                'id' => $id,
            )
        );
    }

    public static function get_chart_by_id($id) {
        global $wpdb;
        $table_name = DB::get_table_name();
        $sql = $wpdb->prepare(
            "SELECT * FROM $table_name WHERE id = %d",
            $id
        );
        return $wpdb->get_row($sql);
    }

    public static function get_all_charts() {
        global $wpdb;
        $table_name = DB::get_table_name();
        return $wpdb->get_results(
            "SELECT id, title, chart_type, created, last_updated FROM $table_name"
        );
    }

    public static function delete_chart_by_id($id) {
        global $wpdb;
        $table_name = DB::get_table_name();
        return $wpdb->delete(
            $table_name,
            array(
                'id' => $id,
            )
        );
    }
}

<?php

class RoughChartDB {
	private static $table_name = 'roughcharts';

	public static function get_table_name() {
		global $wpdb;
		return $wpdb->prefix . self::$table_name;
	}

	public static function init_table() {
		global $wpdb;
		$table_name = RoughChartDB::get_table_name();
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE IF NOT EXISTS $table_name (
		  id mediumint(9) NOT NULL AUTO_INCREMENT,
		  chart text NOT NULL,
		  created datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		  last_updated datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		  PRIMARY KEY (id)
		) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
	}

	public static function drop_table() {
		global $wpdb;
		$table_name = RoughChartDB::get_table_name();
		$wpdb->query( "DROP TABLE IF EXISTS $table_name" );
	}

	public static function add_chart($chart_str) {
		global $wpdb;
		$table_name = RoughChartDB::get_table_name();
		return $wpdb->insert(
			$table_name,
			array(
				'chart' => $chart_str,
				'created' => date('Y-m-d H:i:s'),
				'last_updated' => date('Y-m-d H:i:s'),
			)
		);
	}

	public static function update_chart($id, $chart_str) {
		global $wpdb;
		$table_name = RoughChartDB::get_table_name();
		return $wpdb->update(
			$table_name,
			array(
				'chart' => $chart_str,
				'last_updated' => date('Y-m-d H:i:s'),
			),
			array(
				'id' => $id,
			)
		);
	}

	public static function get_chart_by_id($id) {
		global $wpdb;
		$table_name = RoughChartDB::get_table_name();
		$sql = $wpdb->prepare(
			"SELECT * FROM $table_name WHERE id = %d",
			$id
		);
		return $wpdb->get_row($sql);
	}

	public static function delete_chart_by_id($id) {
		global $wpdb;
		$table_name = RoughChartDB::get_table_name();
		return $wpdb->delete(
			$table_name,
			array(
				'id' => $id,
			)
		);
	}
}

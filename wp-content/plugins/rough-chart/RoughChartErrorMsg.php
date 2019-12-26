<?php

use roughChart\views\View;

class RoughChartErrorMsg {
	private $msg = 'Error message';
	private $description = 'Error message';
	private $status = 500;

	/**
	 * Create RoughChartErrorMsg instance from JsonException
	 *
	 * @docs https://www.php.net/manual/en/class.jsonexception.php
	 * @param JsonException $e
	 * @return RoughChartErrorMsg
	 */
	public static function fromJsonException(JsonException $e) {
		return new RoughChartErrorMsg(
			__('Can\'t parse json', View::$text_domain),
			$e -> getMessage(),
			500
		);
	}

	public static function generalDBError() {
		return new RoughChartErrorMsg(
			__('DB error', View::$text_domain),
			__('Something went wrong', View::$text_domain),
			500
		);
	}

	public function __construct( $msg, $description, $status = 500 ) {
		$this -> msg = $msg;
		$this -> description = $description;
		$this -> status = $status;
	}

	public function toArray() {
		return array(
			'msg' => $this -> msg,
			'description' => $this -> description,
			'status' => $this -> status,
		);
	}

	public function getStatus() {
		return $this -> status;
	}
}

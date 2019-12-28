<?php

namespace roughChart\models;

use JsonException;
use roughChart\views\View;

class ErrorMsg {
    private $msg = 'Error message';
    private $description = 'Error message';
    private $status = 500;

    /**
     * Create RoughChartErrorMsg instance from JsonException
     *
     * @docs https://www.php.net/manual/en/class.jsonexception.php
     * @param JsonException $e
     *
     * @return ErrorMsg
     */
    public static function fromJsonException(JsonException $e) {
        return new ErrorMsg(
            __('Can\'t parse json', View::$text_domain),
            $e -> getMessage(),
            500
        );
    }

    public static function generalDBError() {
        return new ErrorMsg(
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
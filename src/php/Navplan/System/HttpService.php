<?php declare(strict_types=1);

namespace Navplan\System;


class HttpService implements IHttpService {
    private static $instance = NULL;


    public static function getInstance(): IHttpService {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }


    private function __construct() {
    }


    public function header(string $header) {
        header($header);
    }


    public function payload(string $data) {
        echo $data;
    }
}

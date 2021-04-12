<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use InvalidArgumentException;
use Navplan\System\DomainService\IHttpService;


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


    public function sendHeader(string $header) {
        header($header);
    }


    public function sendPayload(string $data) {
        echo $data;
    }


    public function sendArrayResponse(array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE) {
        if ($callback !== NULL && strlen($callback) === 0) {
            throw new InvalidArgumentException('callback must not be empty');
        }

        $jsonOptions = 0;
        if ($jsonNumericCheck) {
            $jsonOptions = JSON_NUMERIC_CHECK;
        }

        $json = json_encode($data, $jsonOptions);

        $this->sendStringResponse($json, $callback);
    }


    public function sendStringResponse(string $data, ?string $callback = NULL) {
        $outputData = $this->decorateWithCallback($data, $callback);

        if ($callback !== NULL) {
            $this->sendJsonp($outputData);
        } else {
            $this->sendJson($outputData);
        }
    }


    private function decorateWithCallback(string $data, ?string $callback): string {
        if ($callback !== NULL && strlen($callback) === 0) {
            throw new InvalidArgumentException('callback must not be empty');
        }

        if ($callback !== NULL) {
            return $callback . "(" . $data . ")";
        } else {
            return $data;
        }
    }


    private function sendJson(string $data) {
        $this->sendHeader("Content-Type: application/json; charset=UTF-8");
        $this->sendPayload($data);
    }


    private function sendJsonp(string $data) {
        $this->sendHeader("Content-Type: application/javascript; charset=UTF-8");
        $this->sendPayload($data);
    }
}

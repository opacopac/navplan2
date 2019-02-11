<?php declare(strict_types=1);

namespace Navplan\Shared;

use InvalidArgumentException;


class RequestResponseHelper {
    public static function sendArrayResponseWithRoot(string $rootElement, array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE) {
        if (strlen($rootElement) === 0) {
            throw new InvalidArgumentException('root element must not be empty');
        }

        self::sendArrayResponse(array($rootElement => $data), $callback, $jsonNumericCheck);
    }


    public static function sendArrayResponse(array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE) {
        if ($callback !== NULL && strlen($callback) === 0) {
            throw new InvalidArgumentException('callback must not be empty');
        }

        $jsonOptions = 0;
        if ($jsonNumericCheck) {
            $jsonOptions = JSON_NUMERIC_CHECK;
        }

        $json = json_encode($data, $jsonOptions);

        self::sendStringResponse($json, $callback);
    }


    public static function sendStringResponse(string $data, ?string $callback = NULL) {
        $outputData = self::decorateWithCallback($data, $callback);

        if ($callback !== NULL) {
            self::sendJsonp($outputData);
        } else {
            self::sendJson($outputData);
        }
    }


    private static function decorateWithCallback(string $data, ?string $callback): string {
        if ($callback !== NULL && strlen($callback) === 0) {
            throw new InvalidArgumentException('callback must not be empty');
        }

        if ($callback !== NULL) {
            return $callback . "(" . $data . ")";
        } else {
            return $data;
        }
    }


    private static function sendJson(string $data) {
        header("Content-Type: application/json; charset=UTF-8");
        echo $data;
    }


    private static function sendJsonp(string $data) {
        header("Content-Type: application/javascript; charset=UTF-8");
        echo $data;
    }
}

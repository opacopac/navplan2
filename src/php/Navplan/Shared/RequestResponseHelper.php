<?php declare(strict_types=1);

namespace Navplan\Shared;

use InvalidArgumentException;


class RequestResponseHelper {
    public static function sendArrayResponseWithRoot(IHttpResponseService $httpService, string $rootElement, array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE) {
        if (strlen($rootElement) === 0) {
            throw new InvalidArgumentException('root element must not be empty');
        }

        self::sendArrayResponse($httpService, array($rootElement => $data), $callback, $jsonNumericCheck);
    }


    public static function sendArrayResponse(IHttpResponseService $httpService, array $data, ?string $callback = NULL, ?bool $jsonNumericCheck = FALSE) {
        if ($callback !== NULL && strlen($callback) === 0) {
            throw new InvalidArgumentException('callback must not be empty');
        }

        $jsonOptions = 0;
        if ($jsonNumericCheck) {
            $jsonOptions = JSON_NUMERIC_CHECK;
        }

        $json = json_encode($data, $jsonOptions);

        self::sendStringResponse($httpService, $json, $callback);
    }


    public static function sendStringResponse(IHttpResponseService $httpService, string $data, ?string $callback = NULL) {
        $outputData = self::decorateWithCallback($data, $callback);

        if ($callback !== NULL) {
            self::sendJsonp($httpService, $outputData);
        } else {
            self::sendJson($httpService, $outputData);
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


    private static function sendJson(IHttpResponseService $httpService, string $data) {
        $httpService->header("Content-Type: application/json; charset=UTF-8");
        $httpService->payload($data);
    }


    private static function sendJsonp(IHttpResponseService $httpService, string $data) {
        $httpService->header("Content-Type: application/javascript; charset=UTF-8");
        $httpService->payload($data);
    }
}

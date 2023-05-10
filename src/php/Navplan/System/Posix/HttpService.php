<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use InvalidArgumentException;
use Navplan\System\DomainService\IHttpService;


class HttpService implements IHttpService {
    public function __construct() {
    }


    public function getRequestMethod(): string {
        return $_SERVER['REQUEST_METHOD'];
    }


    public function getGetArgs(): array {
        return $_GET;
    }


    public function getPostArgs(): array {
        return json_decode(file_get_contents('php://input'), TRUE);
    }


    function getCallbackArg(string $key = "callback"): ?string {
        return $this->getGetArgs()[$key] ?? NULL;
    }


    public function hasGetArg(string $key): bool {
        return isset($this->getGetArgs()[$key]);
    }


    public function hasPostArg(string $key): bool {
        return isset($this->getPostArgs()[$key]);
    }


    public function sendHeader(string $header) {
        header($header);
    }


    public function sendPayload(string $data) {
        echo $data;
    }


    public function sendArrayResponse(array $data, ?string $callbackKey = NULL, ?bool $jsonNumericCheck = FALSE) {
        $this->sendStringResponse(
            json_encode($data, $jsonNumericCheck ? JSON_NUMERIC_CHECK : 0),
            $callbackKey
        );
    }


    public function sendStringResponse(string $data, ?string $callbackKey = NULL) {
        if ($callbackKey === NULL) {
            $callbackKeyFromReq = $this->getCallbackArg();
            if ($callbackKeyFromReq) {
                $callbackKey = $callbackKeyFromReq;
            }
        }

        $outputData = $this->decorateWithCallback($data, $callbackKey);

        if ($callbackKey !== NULL) {
            $this->sendJsonp($outputData);
        } else {
            $this->sendJson($outputData);
        }
    }


    private function decorateWithCallback(string $data, ?string $callbackKey): string {
        if ($callbackKey !== NULL && strlen($callbackKey) === 0) {
            throw new InvalidArgumentException('callback must not be empty string');
        }

        if ($callbackKey !== NULL) {
            return $callbackKey . "(" . $data . ")";
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

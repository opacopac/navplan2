<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\Posix\HttpService;
use Navplan\System\UseCase\IHttpService;


class MockHttpService extends HttpService implements IHttpService {
    public $headerList = [];
    public $body = "";


    public function __construct() {
    }


    public function sendHeader(string $header) {
        array_push($this->headerList, $header);
    }


    public function sendPayload(string $data) {
        $this->body .= $data;
    }
}

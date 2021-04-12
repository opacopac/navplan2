<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\DomainService\IHttpService;
use Navplan\System\Posix\HttpService;


class MockHttpService extends HttpService implements IHttpService {
    public array $headerList = [];
    public string $body = "";


    public function __construct() {
    }


    public function sendHeader(string $header) {
        array_push($this->headerList, $header);
    }


    public function sendPayload(string $data) {
        $this->body .= $data;
    }
}

<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\IHttpResponseService;


class HttpResponseServiceMock implements IHttpResponseService {
    public $headerList = [];
    public $payloadList = [];


    public function header(string $header) {
        array_push($this->headerList, $header);
    }


    public function payload(string $data) {
        array_push($this->payloadList, $data);
    }
}

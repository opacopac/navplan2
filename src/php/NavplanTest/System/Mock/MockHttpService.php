<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IHttpService;


class MockHttpService implements IHttpService {
    public $headerList = [];
    public $body = "";


    public function header(string $header) {
        array_push($this->headerList, $header);
    }


    public function payload(string $data) {
        $this->body .= $data;
    }
}

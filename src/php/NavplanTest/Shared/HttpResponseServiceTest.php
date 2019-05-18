<?php namespace NavplanTest\Shared;

use Navplan\Shared\HttpResponseService;
use Navplan\Shared\IHttpResponseService;
use PHPUnit\Framework\TestCase;


class HttpResponseServiceTest extends TestCase {
    private function getHttpService(): IHttpResponseService {
        return HttpResponseService::getInstance();
    }


    protected function setUp() {
        parent::setUp();
    }


    public function test_writes_a_payload() {
        $this->getHttpService()->payload("MEEP");
        $this->expectOutputString('MEEP');
    }


    /*public function test_writes_a_header() {
        $this->getHttpService()->header("MEEP");
        $this->expectOutputString('MEEP');
    }*/
}

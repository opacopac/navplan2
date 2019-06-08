<?php declare(strict_types=1);

namespace NavplanTest\System;

use Navplan\System\Posix\HttpService;
use Navplan\System\UseCase\IHttpService;
use PHPUnit\Framework\TestCase;


class HttpServiceTest extends TestCase {
    private function getHttpService(): IHttpService {
        return HttpService::getInstance();
    }


    protected function setUp(): void {
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

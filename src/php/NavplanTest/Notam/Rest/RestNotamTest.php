<?php declare(strict_types=1);

namespace NavplanTest\Notam\Rest;

use Navplan\Notam\Rest\RestNotam;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use NavplanTest\Notam\Mocks\DummyNotam3;
use PHPUnit\Framework\TestCase;


class RestNotamTest extends TestCase {
    public function test_toRest() {
        $notam1 = DummyNotam1::create();
        $notam2 = DummyNotam2::create();
        $notam3 = DummyNotam3::create();

        $restNotam1 = RestNotam::toRest($notam1);
        $restNotam2 = RestNotam::toRest($notam2);
        $restNotam3 = RestNotam::toRest($notam3);

        $this->assertEquals(DummyNotam1::createRest(), $restNotam1);
        $this->assertEquals(DummyNotam2::createRest(), $restNotam2);
        $this->assertEquals(DummyNotam3::createRest(), $restNotam3);
    }
}

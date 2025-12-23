<?php declare(strict_types=1);

namespace NavplanTest\Notam\RestModel;

use Navplan\Notam\Rest\Converter\RestNotamConverter;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\DummyNotam2;
use NavplanTest\Notam\Mocks\DummyNotam3;
use PHPUnit\Framework\TestCase;


class NotamConverterTest extends TestCase {
    public function test_toRest() {
        $notam1 = DummyNotam1::create();
        $notam2 = DummyNotam2::create();
        $notam3 = DummyNotam3::create();

        $restNotam1 = RestNotamConverter::toRest($notam1);
        $restNotam2 = RestNotamConverter::toRest($notam2);
        $restNotam3 = RestNotamConverter::toRest($notam3);

        $this->assertEquals(DummyNotam1::createRest(), $restNotam1);
        $this->assertEquals(DummyNotam2::createRest(), $restNotam2);
        $this->assertEquals(DummyNotam3::createRest(), $restNotam3);
    }
}

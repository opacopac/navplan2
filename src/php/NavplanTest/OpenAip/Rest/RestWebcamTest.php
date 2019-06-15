<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\Rest\RestWebcam;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class RestWebcamTest extends TestCase {
    public function test_toRest() {
        $cam1 = DummyWebcam1::create();
        $cam2 = DummyWebcam2::create();

        $camRest1 = RestWebcam::toRest($cam1);
        $camRest2 = RestWebcam::toRest($cam2);

        $this->assertEquals(DummyWebcam1::createRest(), $camRest1);
        $this->assertEquals(DummyWebcam2::createRest(), $camRest2);
    }
}

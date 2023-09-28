<?php declare(strict_types=1);

namespace NavplanTest\Webcam\RestService;

use Navplan\Webcam\Rest\Model\RestWebcamConverter;
use NavplanTest\Webcam\Mocks\DummyWebcam1;
use NavplanTest\Webcam\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class RestWebcamConverterTest extends TestCase {
    public function test_toRest() {
        $cam1 = DummyWebcam1::create();
        $cam2 = DummyWebcam2::create();

        $camRest1 = RestWebcamConverter::toRest($cam1);
        $camRest2 = RestWebcamConverter::toRest($cam2);

        $this->assertEquals(DummyWebcam1::createRest(), $camRest1);
        $this->assertEquals(DummyWebcam2::createRest(), $camRest2);
    }
}

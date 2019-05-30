<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\Rest\RestWebcam;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class RestWebcamTest extends TestCase {
    public function test_toArray() {
        $cam = DummyWebcam1::create();
        $camRest = RestWebcam::toArray($cam);

        $this->assertEquals($cam->name, $camRest["name"]);
        $this->assertEquals($cam->url, $camRest["url"]);
        $this->assertEquals($cam->position ? $cam->position->latitude : NULL, $camRest["latitude"]);
        $this->assertEquals($cam->position ? $cam->position->longitude : NULL, $camRest["longitude"]);
    }


    public function test_toArray2() {
        $cam = DummyWebcam2::create();
        $camRest = RestWebcam::toArray($cam);

        $this->assertEquals($cam->name, $camRest["name"]);
        $this->assertEquals($cam->url, $camRest["url"]);
        $this->assertEquals($cam->position ? $cam->position->latitude : NULL, $camRest["latitude"]);
        $this->assertEquals($cam->position ? $cam->position->longitude : NULL, $camRest["longitude"]);
    }

}

<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\RestService\WebcamRest;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use PHPUnit\Framework\TestCase;


class WebcamRestTest extends TestCase {
    public function test_toArray() {
        $cam = DummyWebcam1::create();
        $camRest = WebcamRest::toArray($cam);

        $this->assertEquals($cam->name, $camRest["name"]);
        $this->assertEquals($cam->url, $camRest["url"]);
        $this->assertEquals($cam->position ? $cam->position->latitude : NULL, $camRest["latitude"]);
        $this->assertEquals($cam->position ? $cam->position->longitude : NULL, $camRest["longitude"]);
    }


    public function test_toArray2() {
        $cam = DummyWebcam2::create();
        $camRest = WebcamRest::toArray($cam);

        $this->assertEquals($cam->name, $camRest["name"]);
        $this->assertEquals($cam->url, $camRest["url"]);
        $this->assertEquals($cam->position ? $cam->position->latitude : NULL, $camRest["latitude"]);
        $this->assertEquals($cam->position ? $cam->position->longitude : NULL, $camRest["longitude"]);
    }

}

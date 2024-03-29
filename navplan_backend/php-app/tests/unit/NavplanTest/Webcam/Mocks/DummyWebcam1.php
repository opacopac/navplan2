<?php declare(strict_types=1);

namespace NavplanTest\Webcam\Mocks;

use Navplan\Webcam\Domain\Model\Webcam;


class DummyWebcam1 {
    public static function create(): Webcam {
        return new Webcam(
            "Webcam",
            "http://www.flughafenbern.ch/de/erlebnis-flughafen/live/webcam",
            NULL,
            "LSZB"
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 18,
            "name" => "Webcam",
            "url" => "http://www.flughafenbern.ch/de/erlebnis-flughafen/live/webcam",
            "latitude" => NULL,
            "longitude" => NULL,
            "airport_icao" => "LSZB"
        );
    }


    public static function createRest(): array {
        return array(
            "name" => "Webcam",
            "url" => "http://www.flughafenbern.ch/de/erlebnis-flughafen/live/webcam",
            "pos" => NULL
        );
    }
}

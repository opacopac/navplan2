<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DomainModel\Webcam;


class DummyWebcam2 {
    public static function create(): Webcam {
        return new Webcam(
            "Roggenberg",
            "http://roggenberg.roundshot.com/",
            new Position2d(7.7186, 47.305)
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 1,
            "name" => "Roggenberg",
            "url" => "http://roggenberg.roundshot.com/",
            "latitude" => 47.305,
            "longitude" => 7.7186,
            "airport_icao" => NULL
        );
    }


    public static function createRest(): array {
        return array(
            "name" => "Roggenberg",
            "url" => "http://roggenberg.roundshot.com/",
            "pos" => [7.7186, 47.305]
        );
    }
}

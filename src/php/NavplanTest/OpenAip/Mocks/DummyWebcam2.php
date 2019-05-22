<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\Domain\Webcam;


class DummyWebcam2 {
    public static function create(): Webcam {
        return new Webcam(
            "Roggenberg",
            "http://roggenberg.roundshot.com/",
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "name" => "Roggenberg",
            "url" => "http://roggenberg.roundshot.com/",
            "latitude" => 47.305,
            "longitude" => 7.7186,
        );
    }
}

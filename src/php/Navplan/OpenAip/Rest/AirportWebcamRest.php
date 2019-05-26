<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\Webcam;


class AirportWebcamRest {
    public static function toArray(Webcam $cam): array {
        return array(
            "name" => $cam->name,
            "url" => $cam->url,
        );
    }
}

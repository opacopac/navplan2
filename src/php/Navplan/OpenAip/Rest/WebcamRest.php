<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\Webcam;


class WebcamRest {
    public static function toArray(Webcam $cam): array {
        return array(
            "name" => $cam->name,
            "url" => $cam->url,
            "latitude" => $cam->position ? $cam->position->latitude : NULL,
            "longitude" => $cam->position ? $cam->position->longitude : NULL
        );
    }
}

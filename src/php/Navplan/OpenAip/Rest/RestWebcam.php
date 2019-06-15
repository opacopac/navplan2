<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\Geometry\Rest\RestPosition2d;
use Navplan\OpenAip\Domain\Webcam;


class RestWebcam {
    public static function toRest(Webcam $cam): array {
        return array(
            "name" => $cam->name,
            "url" => $cam->url,
            "pos" => $cam->position ? RestPosition2d::toRest($cam->position) : NULL
        );
    }
}

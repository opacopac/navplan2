<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\Geometry\RestModel\Position2dConverter;
use Navplan\OpenAip\DomainModel\Webcam;


class WebcamConverter {
    public static function toRest(Webcam $cam): array {
        return array(
            "name" => $cam->name,
            "url" => $cam->url,
            "pos" => $cam->position ? Position2dConverter::toRest($cam->position) : NULL
        );
    }
}

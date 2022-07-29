<?php declare(strict_types=1);

namespace Navplan\Webcam\Rest\Model;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Webcam\Domain\Model\Webcam;


class RestWebcamConverter {
    public static function toRest(Webcam $cam): array {
        return array(
            "name" => $cam->name,
            "url" => $cam->url,
            "pos" => $cam->position ? RestPosition2dConverter::toRest($cam->position) : NULL,
            "airport_icao" => $cam->airportIcao
        );
    }


    public static function toRestList(array $webcamList): array {
        return array_map(function ($webcam) { return self::toRest($webcam); }, $webcamList);
    }
}

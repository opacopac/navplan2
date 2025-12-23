<?php declare(strict_types=1);

namespace Navplan\Fir\Rest\Converter;

use Navplan\Common\Rest\Converter\RestPosition2dConverter;
use Navplan\Fir\Domain\Model\Fir;


class RestFirConverter {
    public static function toRest(Fir $fir): array {
        return array(
            "id" => $fir->id,
            "region" => $fir->region,
            "icao" => $fir->icao,
            "name" => $fir->name,
            "stateCode" => $fir->stateCode,
            "stateName" => $fir->stateName,
            "center" => RestPosition2dConverter::toRest($fir->center),
            "polygon" => $fir->polygon->toArray()
        );
    }
}

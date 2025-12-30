<?php declare(strict_types=1);

namespace Navplan\Airspace\Rest\Converter;

use Navplan\Airspace\Domain\Model\Fir;
use Navplan\Common\Rest\Converter\RestPosition2dConverter;


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


    /**
     * @param Fir[] $firList
     * @return array
     */
    public static function toRestList(array $firList): array {
        return array_map(fn($fir) => self::toRest($fir), $firList);
    }
}

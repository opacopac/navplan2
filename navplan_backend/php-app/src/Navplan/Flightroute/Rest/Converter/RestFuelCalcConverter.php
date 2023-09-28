<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Common\Rest\Converter\RestTimeConverter;
use Navplan\Common\Rest\Converter\RestVolumeConverter;
use Navplan\Flightroute\Domain\Model\FuelCalc;


class RestFuelCalcConverter {
    public static function fromRest(array $args): FuelCalc {
        return new FuelCalc(
            isset($args["triptime"]) ? RestTimeConverter::fromRest($args["triptime"]) : NULL,
            isset($args["alttime"]) ? RestTimeConverter::fromRest($args["alttime"]) : NULL,
            isset($args["restime"]) ? RestTimeConverter::fromRest($args["restime"]) : NULL,
            isset($args["mintime"]) ? RestTimeConverter::fromRest($args["mintime"]) : NULL,
            isset($args["extratime"]) ? RestTimeConverter::fromRest($args["extratime"]) : NULL,
            isset($args["blocktime"]) ? RestTimeConverter::fromRest($args["blocktime"]) : NULL,
            isset($args["tripvol"]) ? RestVolumeConverter::fromRest($args["tripvol"]) : NULL,
            isset($args["altvol"]) ? RestVolumeConverter::fromRest($args["altvol"]) : NULL,
            isset($args["resvol"]) ? RestVolumeConverter::fromRest($args["resvol"]) : NULL,
            isset($args["minvol"]) ? RestVolumeConverter::fromRest($args["minvol"]) : NULL,
            isset($args["extravol"]) ? RestVolumeConverter::fromRest($args["extravol"]) : NULL,
            isset($args["blockvol"]) ? RestVolumeConverter::fromRest($args["blockvol"]) : NULL,
        );
    }


    public static function toRest(FuelCalc $fuelCalc): array {
        return array(
            "triptime" => RestTimeConverter::toRest($fuelCalc->tripTime),
            "alttime" => RestTimeConverter::toRest($fuelCalc->alternateTime),
            "restime" => RestTimeConverter::toRest($fuelCalc->reserveTime),
            "mintime" => RestTimeConverter::toRest($fuelCalc->minimumTime),
            "extratime" => RestTimeConverter::toRest($fuelCalc->extraTime),
            "blocktime" => RestTimeConverter::toRest($fuelCalc->blockTime),
            "tripvol" => RestVolumeConverter::toRest($fuelCalc->tripVolume),
            "altvol" => RestVolumeConverter::toRest($fuelCalc->alternateVolume),
            "resvol" => RestVolumeConverter::toRest($fuelCalc->reserveVolume),
            "minvol" => RestVolumeConverter::toRest($fuelCalc->minimumVolume),
            "extravol" => RestVolumeConverter::toRest($fuelCalc->extraVolume),
            "blockvol" => RestVolumeConverter::toRest($fuelCalc->blockVolume),
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\RestModel\RestConsumptionConverter;
use Navplan\Common\RestModel\RestTimeConverter;
use Navplan\Flightroute\DomainModel\FuelCalc;


class RestFuelCalcConverter {
    public static function fromRest(array $args): FuelCalc {
        return new FuelCalc(
            isset($args["triptime"]) ? RestTimeConverter::fromRest($args["triptime"]) : NULL,
            isset($args["alttime"]) ? RestTimeConverter::fromRest($args["alttime"]) : NULL,
            isset($args["restime"]) ? RestTimeConverter::fromRest($args["restime"]) : NULL,
            isset($args["mintime"]) ? RestTimeConverter::fromRest($args["mintime"]) : NULL,
            isset($args["extratime"]) ? RestTimeConverter::fromRest($args["extratime"]) : NULL,
            isset($args["blocktime"]) ? RestTimeConverter::fromRest($args["blocktime"]) : NULL,
            isset($args["tripcons"]) ? RestConsumptionConverter::fromRest($args["tripcons"]) : NULL,
            isset($args["altcons"]) ? RestConsumptionConverter::fromRest($args["altcons"]) : NULL,
            isset($args["rescons"]) ? RestConsumptionConverter::fromRest($args["rescons"]) : NULL,
            isset($args["mincons"]) ? RestConsumptionConverter::fromRest($args["mincons"]) : NULL,
            isset($args["extracons"]) ? RestConsumptionConverter::fromRest($args["extracons"]) : NULL,
            isset($args["blockcons"]) ? RestConsumptionConverter::fromRest($args["blockcons"]) : NULL,
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
            "tripcons" => RestConsumptionConverter::toRest($fuelCalc->tripConsumption),
            "altcons" => RestConsumptionConverter::toRest($fuelCalc->alternateConsumption),
            "rescons" => RestConsumptionConverter::toRest($fuelCalc->reserveConsumption),
            "mincons" => RestConsumptionConverter::toRest($fuelCalc->minimumConsumption),
            "extracons" => RestConsumptionConverter::toRest($fuelCalc->extraConsumption),
            "blockcons" => RestConsumptionConverter::toRest($fuelCalc->blockConsumption),
        );
    }
}

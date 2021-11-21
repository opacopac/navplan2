<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;

use Navplan\Common\DomainModel\Consumption;
use Navplan\Common\DomainModel\Time;


class FuelCalc {
    public function __construct(
        public ?Time $tripTime,
        public ?Time $alternateTime,
        public ?Time $reserveTime,
        public ?Time $minimumTime,
        public ?Time $extraTime,
        public ?Time $blockTime,
        public ?Consumption $tripConsumption,
        public ?Consumption $alternateConsumption,
        public ?Consumption $reserveConsumption,
        public ?Consumption $minimumConsumption,
        public ?Consumption $extraConsumption,
        public ?Consumption $blockConsumption,
    ) {
    }
}

<?php declare(strict_types=1);

namespace Navplan\Flightroute\DomainModel;

use Navplan\Common\DomainModel\Consumption;
use Navplan\Common\DomainModel\Speed;


class Flightroute {
    public function __construct(
        public ?int $id,
        public string $title,
        public ?Speed $aircraftSpeedKt,
        public ?Consumption $aircraftConsumption,
        public ?float $extraFuelL,
        public ?string $comments,
        public ?string $shareId,
        public ?string $hash,
        /**
         * @var Waypoint[]
         */
        public array $waypoinList,
        public ?Waypoint $alternate
    ) {
    }


    /**
     * @return Waypoint[]
     */
    public function getWaypointsInclAlternate(): array {
        if ($this->alternate) {
            return [...$this->waypoinList, $this->alternate];
        } else {
            return $this->waypoinList;
        }
    }
}

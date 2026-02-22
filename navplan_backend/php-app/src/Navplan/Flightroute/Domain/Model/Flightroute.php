<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Model;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Speed;


class Flightroute {
    public function __construct(
        public ?int $id,
        public string $title,
        public Speed $aircraftSpeed,
        public Consumption $aircraftConsumption,
        public int $extraFuelMin,
        public ?Length $cruiseAltitude,
        public ?string $comments,
        public ?string $shareId,
        public ?string $hash,
        /**
         * @var Waypoint[]
         */
        public array        $waypoinList,
        public ?Waypoint    $alternate
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

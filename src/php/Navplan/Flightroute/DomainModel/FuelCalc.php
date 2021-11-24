<?php declare(strict_types=1);

namespace Navplan\Flightroute\DomainModel;

use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\Volume;


class FuelCalc {
    public function __construct(
        public ?Time $tripTime,
        public ?Time $alternateTime,
        public ?Time $reserveTime,
        public ?Time $minimumTime,
        public ?Time $extraTime,
        public ?Time $blockTime,
        public ?Volume $tripVolume,
        public ?Volume $alternateVolume,
        public ?Volume $reserveVolume,
        public ?Volume $minimumVolume,
        public ?Volume $extraVolume,
        public ?Volume $blockVolume,
    ) {
    }
}

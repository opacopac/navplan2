<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;


class WeatherInfo {
    public function __construct(
        public int $wwValue,
        public ?Altitude $ceiling,
        public Position2d $pos
    ) {
    }
}

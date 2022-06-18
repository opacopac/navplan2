<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Altitude;


class WeatherInfo {
    public function __construct(
        public ?int $wwValue,
        public ?Altitude $ceiling,
    ) {
    }
}

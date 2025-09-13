<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position2d;


class WeatherInfo {
    public function __construct(
        public int $wwValue,
        public ?Altitude $ceiling,
        public Position2d $pos
    ) {
    }
}

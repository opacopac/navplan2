<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use DateTime;


class ForecastRun {
    public function __construct(
        public DateTime $startTime,
        public WeatherModelConfig $modelConfig
    ) {
    }


    public function getName(): string {
        return $this->startTime->format('YmdH');
    }
}

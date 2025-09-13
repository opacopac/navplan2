<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;


class ForecastStep {
    public function __construct(
        public string $runName,
        public int $step
    ) {
    }
}

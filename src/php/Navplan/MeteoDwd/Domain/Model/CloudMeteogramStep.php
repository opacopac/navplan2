<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;


class CloudMeteogramStep {
    public function __construct(
        public ForecastStep $forecastStep,
        /**
         * @var VerticalCloudLevel[]
         */
        public array $cloudLevels
    ) {
    }
}

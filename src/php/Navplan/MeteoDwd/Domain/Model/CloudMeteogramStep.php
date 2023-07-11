<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;


class CloudMeteogramStep {
    public function __construct(
        public int $forecastStep,
        /**
         * @var VerticalCloudLevel[]
         */
        public array $cloudLevels
    ) {
    }
}

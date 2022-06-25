<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Time;


class WeatherModelConfig {
    public function __construct(
        public int $modelType,
        public int $minStep,
        public int $maxStep,
        public Time $stepLength
    ) {
    }
}

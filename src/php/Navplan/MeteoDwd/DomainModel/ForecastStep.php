<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


class ForecastStep {
    public function __construct(
        public string $run,
        public int $step
    ) {
    }
}

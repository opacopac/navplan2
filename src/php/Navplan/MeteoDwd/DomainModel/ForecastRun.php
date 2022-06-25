<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use DateTime;


class ForecastRun {
    public function __construct(
        public DateTime $startTime
    ) {
    }
}

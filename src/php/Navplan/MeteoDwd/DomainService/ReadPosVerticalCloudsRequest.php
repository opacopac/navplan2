<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoDwd\DomainModel\ForecastRun;


class ReadPosVerticalCloudsRequest {
    public function __construct(
        public ForecastRun $forecastRun,
        public Position2d $pos
    ) {
    }
}

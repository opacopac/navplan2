<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportKml;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Track\DomainModel\Track;


class ExportKmlRequest {
    public function __construct(
        public Flightroute $flightroute,
        public Track $track,
    ) {
    }
}

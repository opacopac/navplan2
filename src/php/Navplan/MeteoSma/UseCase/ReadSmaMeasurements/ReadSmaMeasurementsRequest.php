<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase\ReadSmaMeasurements;

use Navplan\Geometry\DomainModel\Extent;


class ReadSmaMeasurementsRequest {
    public function __construct(public Extent $extent) {
    }
}

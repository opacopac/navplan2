<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase\ReadSmaMeasurements;

use Navplan\Common\DomainModel\Extent2d;


class ReadSmaMeasurementsRequest {
    public function __construct(public Extent2d $extent) {
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;

use Navplan\Geometry\DomainModel\Extent;


class TrafficAdsbexReadRequest {
    public function __construct(public Extent $extent) {
    }
}

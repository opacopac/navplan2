<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;

use Navplan\Common\DomainModel\Extent2d;


class TrafficAdsbexReadRequest {
    public function __construct(public Extent2d $extent) {
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTraffic;

use Navplan\Common\DomainModel\Extent2d;


class TrafficAdsbexReadRequest {
    public function __construct(public Extent2d $extent) {
    }
}

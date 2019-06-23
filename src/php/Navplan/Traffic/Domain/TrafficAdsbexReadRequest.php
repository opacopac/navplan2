<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;

use Navplan\Geometry\Domain\Extent;


class TrafficAdsbexReadRequest {
    public $extent;


    public function __construct(
        Extent $extent
    ) {
        $this->extent = $extent;
    }
}

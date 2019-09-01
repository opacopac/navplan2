<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Domain;

use Navplan\Geometry\Domain\Extent;


class ReadSmaMeasurementsRequest {
    public $extent;


    public function __construct(Extent $extent) {
        $this->extent = $extent;
    }
}

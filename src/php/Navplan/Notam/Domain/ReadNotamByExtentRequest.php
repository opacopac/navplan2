<?php declare(strict_types=1);

namespace Navplan\Notam\Domain;

use Navplan\Geometry\Domain\Extent;


class ReadNotamByExtentRequest {
    public $extent;
    public $zoom;
    public $minNotamTimestamp;
    public $maxNotamTimestamp;


    public function __construct(
        Extent $extent,
        int $zoom,
        ?int $minNotamTimestamp,
        ?int $maxNotamTimestamp
    ) {
        $this->extent = $extent;
        $this->zoom = $zoom;
        $this->minNotamTimestamp = $minNotamTimestamp;
        $this->maxNotamTimestamp = $maxNotamTimestamp;
    }
}

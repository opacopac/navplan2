<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;

use Navplan\Geometry\Domain\Extent;


class SearchPointItemsRequest {
    public $extent;
    public $zoom;


    public function __construct(
        Extent $extent,
        int $zoom
    ) {
        $this->extent = $extent;
        $this->zoom = $zoom;
    }
}

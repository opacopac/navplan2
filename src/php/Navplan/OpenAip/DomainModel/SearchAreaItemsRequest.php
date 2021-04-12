<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainModel;

use Navplan\Geometry\DomainModel\Extent;


class SearchAreaItemsRequest {
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

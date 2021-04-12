<?php declare(strict_types=1);

namespace Navplan\Search\DomainModel;

use Navplan\Geometry\DomainModel\Extent;


class SearchByExtentQuery {
    public function __construct(
        public array $searchItems,
        public Extent $extent,
        public int $zoom,
        public ?int $minNotamTimestamp,
        public ?int $maxNotamTimestamp,
        public ?string $token
    ) {
    }
}

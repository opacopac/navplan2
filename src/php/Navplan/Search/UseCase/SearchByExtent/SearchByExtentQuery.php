<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByExtent;

use Navplan\Common\DomainModel\Extent2d;


class SearchByExtentQuery {
    public function __construct(
        public array $searchItems,
        public Extent2d $extent,
        public int $zoom,
        public ?int $minNotamTimestamp,
        public ?int $maxNotamTimestamp,
        public ?string $token
    ) {
    }
}

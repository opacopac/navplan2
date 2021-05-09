<?php declare(strict_types=1);

namespace Navplan\Search\DomainModel;

use Navplan\Common\DomainModel\Position2d;


class SearchByPositionQuery {
    public function __construct(
        public array $searchItems,
        public Position2d $position,
        public float $maxRadius_deg,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp,
        public ?string $token
    ) {
    }
}

<?php declare(strict_types=1);

namespace Navplan\Search\Domain\Model;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\TimestampInterval;


class SearchByPositionQuery {
    public function __construct(
        public array $searchItems,
        public Position2d $position,
        public float $maxRadius_deg,
        public int $maxResults,
        public TimestampInterval $notamInterval,
        public ?string $token
    ) {
    }
}

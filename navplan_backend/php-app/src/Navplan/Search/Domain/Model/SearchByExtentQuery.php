<?php declare(strict_types=1);

namespace Navplan\Search\Domain\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\TimestampInterval;


class SearchByExtentQuery {
    public function __construct(
        public array $searchItems,
        public Extent2d $extent,
        public int $zoom,
        public ?TimestampInterval $notamInterval,
        public ?string $token
    ) {
    }
}

<?php declare(strict_types=1);

namespace Navplan\Search\Domain\Model;

use Navplan\Common\Domain\Model\TimestampInterval;


class SearchByIcaoQuery {
    public function __construct(
        public array $searchItems,
        public array $icaoList,
        public TimestampInterval $notamInterval
    ) {
    }
}

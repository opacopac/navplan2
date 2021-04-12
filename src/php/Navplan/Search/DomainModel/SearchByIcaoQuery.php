<?php declare(strict_types=1);

namespace Navplan\Search\DomainModel;


class SearchByIcaoQuery {
    public function __construct(
        public array $searchItems,
        public array $icaoList,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }
}

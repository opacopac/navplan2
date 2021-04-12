<?php declare(strict_types=1);

namespace Navplan\Search\DomainModel;


class SearchByTextQuery {
    public function __construct(
        public array $searchItems,
        public string $searchText,
        public ?string $token
    ) {
    }
}

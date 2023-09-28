<?php declare(strict_types=1);

namespace Navplan\Search\Domain\Model;


class SearchByTextQuery {
    public function __construct(
        public array $searchItems,
        public string $searchText,
        public ?string $token
    ) {
    }
}

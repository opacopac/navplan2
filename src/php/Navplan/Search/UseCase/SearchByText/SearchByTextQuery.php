<?php declare(strict_types=1);

namespace Navplan\Search\UseCase\SearchByText;


class SearchByTextQuery {
    public function __construct(
        public array $searchItems,
        public string $searchText,
        public ?string $token
    ) {
    }
}

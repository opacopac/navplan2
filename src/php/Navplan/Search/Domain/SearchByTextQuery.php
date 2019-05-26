<?php declare(strict_types=1);

namespace Navplan\Search\Domain;


class SearchByTextQuery {
    public $searchItems;
    public $searchText;
    public $token;


    public function __construct(
        array $searchItems,
        string $searchText,
        ?string $token
    ) {
        $this->searchItems = $searchItems;
        $this->searchText = $searchText;
        $this->token = $token;
    }
}

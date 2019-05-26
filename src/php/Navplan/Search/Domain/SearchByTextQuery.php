<?php declare(strict_types=1);

namespace Navplan\Search\Domain;


class SearchByTextQuery {
    public $searchItems;
    public $searchText;
    public $email;


    public function __construct(
        array $searchItems,
        string $searchText,
        ?string $email
    ) {
        $this->searchItems = $searchItems;
        $this->searchText = $searchText;
        $this->email = $email;
    }
}

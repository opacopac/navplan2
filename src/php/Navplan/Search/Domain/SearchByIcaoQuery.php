<?php declare(strict_types=1);

namespace Navplan\Search\Domain;


class SearchByIcaoQuery {
    public $searchItems;
    public $icaoList;
    public $minNotamTimestamp;
    public $maxNotamTimestamp;


    public function __construct(
        array $searchItems,
        array $icaoList,
        int $minNotamTimestamp,
        int $maxNotamTimestamp
    ) {
        $this->searchItems = $searchItems;
        $this->icaoList = $icaoList;
        $this->minNotamTimestamp = $minNotamTimestamp;
        $this->maxNotamTimestamp = $maxNotamTimestamp;
    }
}

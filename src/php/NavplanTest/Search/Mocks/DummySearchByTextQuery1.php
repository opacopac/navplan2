<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Search\DomainModel\SearchByTextQuery;


class DummySearchByTextQuery1 {
    public static function create(): SearchByTextQuery {
        return new SearchByTextQuery(
            DummySearchItemType1::createAllItemTypesList(),
            "LSZG",
            "asdf@asdf.com"
        );
    }
}

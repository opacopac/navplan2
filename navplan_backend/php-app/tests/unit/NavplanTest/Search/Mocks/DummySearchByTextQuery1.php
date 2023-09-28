<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Search\Domain\Model\SearchByTextQuery;


class DummySearchByTextQuery1 {
    public static function create(): SearchByTextQuery {
        return new SearchByTextQuery(
            DummySearchItemType1::createAllItemTypesList(),
            "LSZG",
            "asdf@asdf.com"
        );
    }
}

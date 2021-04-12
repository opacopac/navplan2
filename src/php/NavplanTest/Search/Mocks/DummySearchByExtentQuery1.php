<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Search\DomainModel\SearchByExtentQuery;


class DummySearchByExtentQuery1 {
    public static function create(): SearchByExtentQuery {
        return new SearchByExtentQuery(
            DummySearchItemType1::createAllItemTypesList(),
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            1558799351,
            1558899351,
            "asdf@asdf.com"
        );
    }
}

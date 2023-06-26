<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Search\Domain\Model\SearchByExtentQuery;


class DummySearchByExtentQuery1 {
    public static function create(): SearchByExtentQuery {
        return new SearchByExtentQuery(
            DummySearchItemType1::createAllItemTypesList(),
            Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            1558799351,
            1558899351,
            "asdf@asdf.com"
        );
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Search\Domain\SearchByPositionQuery;


class DummySearchByPositionQuery1 {
    public static function create(): SearchByPositionQuery {
        return new SearchByPositionQuery(
            DummySearchItemType1::createAllItemTypesList(),
            new Position2d(7.0, 47.0),
            0.5,
            "asdf@asdf.com"
        );
    }
}

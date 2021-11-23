<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Search\UseCase\SearchByIcao\SearchByIcaoQuery;


class DummySearchByIcaoQuery1 {
    public static function create(): SearchByIcaoQuery {
        return new SearchByIcaoQuery(
            DummySearchItemType1::createAllItemTypesList(),
            self::createIcaoList(),
            1558799351,
            1558899351
        );
    }


    public static function createIcaoList(): array {
        return ["LSZB", "LSZG", "LSMP"];
    }
}

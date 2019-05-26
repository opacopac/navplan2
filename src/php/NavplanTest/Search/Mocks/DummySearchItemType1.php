<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Search\Domain\SearchItemType;


class DummySearchItemType1 {
    public static function createAllItemTypesList(): array {
        return [
            SearchItemType::AIRPORTS,
            SearchItemType::NAVAIDS,
            SearchItemType::AIRSPACES,
            SearchItemType::REPORTINGPOINTS,
            SearchItemType::USERPOINTS,
            SearchItemType::WEBCAMS,
            SearchItemType::GEONAMES,
            SearchItemType::NOTAMS,
        ];
    }
}

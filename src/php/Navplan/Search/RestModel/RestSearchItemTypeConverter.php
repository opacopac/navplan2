<?php declare(strict_types=1);

namespace Navplan\Search\RestModel;

use InvalidArgumentException;
use Navplan\Search\DomainModel\SearchItemType;


class RestSearchItemTypeConverter{
    const SEARCH_ITEM_DELIMITER = ",";
    const SEARCH_ITEM_KEY_MAP = array(
        SearchItemType::AIRPORTS => 'airports',
        SearchItemType::NAVAIDS => 'navaids',
        SearchItemType::AIRSPACES => 'airspaces',
        SearchItemType::REPORTINGPOINTS => 'reportingpoints',
        SearchItemType::USERPOINTS => 'userpoints',
        SearchItemType::WEBCAMS => 'webcams',
        SearchItemType::GEONAMES => 'geonames',
        SearchItemType::NOTAMS => 'notams',
        SearchItemType::CIRCUITS => 'circuits'
    );


    public static function fromString(string $searchItemString): array {
        $searchItemStrings = explode(self::SEARCH_ITEM_DELIMITER, $searchItemString);
        return array_map(
            function (string $searchItemString) { return self::getTypefromRestKey($searchItemString); },
            $searchItemStrings
        );
    }


    public static function getRestKeyFromType(int $searchItemType): string {
        if (!isset(self::SEARCH_ITEM_KEY_MAP[$searchItemType])) {
            throw new InvalidArgumentException('unknown search item type "' . $searchItemType . '"');
        }

        return self::SEARCH_ITEM_KEY_MAP[$searchItemType];
    }


    public static function getTypefromRestKey(string $searchItemTypeString): int {
        $key = array_search($searchItemTypeString, self::SEARCH_ITEM_KEY_MAP);
        if ($key === FALSE) {
            throw new InvalidArgumentException('unknown search item type string "' . $searchItemTypeString . '"');
        }

        return $key;
    }
}

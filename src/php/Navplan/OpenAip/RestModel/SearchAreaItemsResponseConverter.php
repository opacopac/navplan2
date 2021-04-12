<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\OpenAip\DomainModel\Airspace;
use Navplan\OpenAip\DomainModel\SearchAreaItemsResponse;


class SearchAreaItemsResponseConverter {
    public static function toRest(SearchAreaItemsResponse $response): array {
        return array(
            'airspaces' => array_map(function (Airspace $as) { return AirspaceConverter::toRest($as); }, $response->airspaces),
            'reportingsectors' => [],
        );
    }
}

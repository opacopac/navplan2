<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\Airspace;
use Navplan\OpenAip\Domain\SearchAreaItemsResponse;


class RestSearchAreaItemsResponse {
    public static function toRest(SearchAreaItemsResponse $response): array {
        return array(
            'airspaces' => array_map(function (Airspace $as) { return RestAirspace::toRest($as); }, $response->airspaces),
            'reportingsectors' => [],
        );
    }
}

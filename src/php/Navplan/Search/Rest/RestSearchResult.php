<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use Navplan\Search\Domain\SearchResult;


class RestSearchResult {
    public static function toArray(
        SearchResult $result
    ): array {
        return array(
            'airports' => $result->airports,
            'navaids' => $result->navaids,
            'airspaces' => $result->airspaces,
            'reportingpoints' => $result->reportingPoints,
            'userpoints' => $result->userPoints,
            'webcams' => $result->webcams,
            'geonames' => [],
            'notams' => $result->notams
        );
    }
}

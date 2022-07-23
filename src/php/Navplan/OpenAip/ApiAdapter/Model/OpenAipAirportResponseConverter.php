<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipReadAirportResponse;


class OpenAipAirportResponseConverter {
    public static function fromRest(array $restResponse): OpenAipReadAirportResponse {
        return new OpenAipReadAirportResponse(
            intval($restResponse["page"]),
            isset($restResponse["nextPage"]) ? intval($restResponse["nextPage"]) : -1,
            intval($restResponse["totalPages"]),
            intval($restResponse["totalCount"]),
            OpenAipAirportConverter::fromRestList($restResponse["items"]),
        );
    }
}

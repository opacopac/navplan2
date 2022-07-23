<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipReadAirportResponse;


class OpenAipAirportResponseConverter {
    public static function fromRest(array $restNavaidResponse): OpenAipReadAirportResponse {
        return new OpenAipReadAirportResponse(
            intval($restNavaidResponse["page"]),
            isset($restNavaidResponse["nextPage"]) ? intval($restNavaidResponse["nextPage"]) : -1,
            OpenAipAirportConverter::fromRestList($restNavaidResponse["items"]),
        );
    }
}

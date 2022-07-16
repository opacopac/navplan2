<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipReadAirspacesResponse;


class OpenAipAirspaceResponseConverter {
    public static function fromRest(array $restNavaidResponse): OpenAipReadAirspacesResponse {
        return new OpenAipReadAirspacesResponse(
            intval($restNavaidResponse["page"]),
            isset($restNavaidResponse["nextPage"]) ? intval($restNavaidResponse["nextPage"]) : -1,
            OpenAipAirspaceConverter::fromRestList($restNavaidResponse["items"]),
        );
    }
}

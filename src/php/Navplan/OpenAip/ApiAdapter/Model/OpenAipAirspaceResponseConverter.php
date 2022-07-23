<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipReadAirspacesResponse;


class OpenAipAirspaceResponseConverter {
    public static function fromRest(array $restResponse): OpenAipReadAirspacesResponse {
        return new OpenAipReadAirspacesResponse(
            intval($restResponse["page"]),
            isset($restResponse["nextPage"]) ? intval($restResponse["nextPage"]) : -1,
            intval($restResponse["totalPages"]),
            intval($restResponse["totalCount"]),
            OpenAipAirspaceConverter::fromRestList($restResponse["items"]),
        );
    }
}

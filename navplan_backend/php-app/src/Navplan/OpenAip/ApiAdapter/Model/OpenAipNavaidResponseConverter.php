<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipReadNavaidsResponse;


class OpenAipNavaidResponseConverter {
    public static function fromRest(array $restResponse): OpenAipReadNavaidsResponse {
        return new OpenAipReadNavaidsResponse(
            intval($restResponse["page"]),
            isset($restResponse["nextPage"]) ? intval($restResponse["nextPage"]) : -1,
            intval($restResponse["totalPages"]),
            intval($restResponse["totalCount"]),
            OpenAipNavaidConverter::fromRestList($restResponse["items"]),
        );
    }
}

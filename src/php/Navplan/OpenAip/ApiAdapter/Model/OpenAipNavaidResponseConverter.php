<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\OpenAip\ApiAdapter\Service\OpenAipReadNavaidsResponse;


class OpenAipNavaidResponseConverter {
    public static function fromRest(array $restNavaidResponse): OpenAipReadNavaidsResponse {
        return new OpenAipReadNavaidsResponse(
            intval($restNavaidResponse["page"]),
            isset($restNavaidResponse["nextPage"]) ? intval($restNavaidResponse["nextPage"]) : -1,
            OpenAipNavaidConverter::fromRestList($restNavaidResponse["items"]),
        );
    }
}

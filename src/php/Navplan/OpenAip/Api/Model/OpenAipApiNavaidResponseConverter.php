<?php declare(strict_types=1);

namespace Navplan\OpenAip\Api\Model;


class OpenAipApiNavaidResponseConverter {
    public static function fromRest(array $restNavaidResponse): OpenAipNavaidResponse {
        return new OpenAipNavaidResponse(
            intval($restNavaidResponse["page"]),
            isset($restNavaidResponse["nextPage"]) ? intval($restNavaidResponse["nextPage"]) : -1,
            OpenAipApiNavaidConverter::fromRestList($restNavaidResponse["items"]),
        );
    }
}

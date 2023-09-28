<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\Domain\Model\AirportRunway;


class OpenAipAirportRunwayConverter {
    public static function fromRest(array $restRunway): AirportRunway {
        return new AirportRunway(
            $restRunway["designator"],
            OpenAipAirportRundwayTypeConverter::fromRest($restRunway["surface"]["mainComposite"]),
            isset($restRunway["dimension"]) && isset($restRunway["dimension"]["length"]) ? OpenAipLengthConverter::fromRest($restRunway["dimension"]["length"]) : null,
            isset($restRunway["dimension"]) && isset($restRunway["dimension"]["width"]) ? OpenAipLengthConverter::fromRest($restRunway["dimension"]["width"]): null,
            intval($restRunway["trueHeading"]),
            isset($restRunway["declaredDistance"]) && isset($restRunway["declaredDistance"]["tora"]) ? OpenAipLengthConverter::fromRest($restRunway["declaredDistance"]["tora"]) : null,
            isset($restRunway["declaredDistance"]) && isset($restRunway["declaredDistance"]["lda"]) ? OpenAipLengthConverter::fromRest($restRunway["declaredDistance"]["lda"]) : null,
            isset($restRunway["visualApproachAids"]) ? intval($restRunway["visualApproachAids"]) === 1 : null,
            OpenAipAirportRundwayOperationsConverter::fromRest($restRunway["operations"])
        );
    }


    /**
     * @param array $restRunways
     * @return AirportRunway[]
     */
    public static function fromRestList(array $restRunways): array {
        return array_map(function ($restRunway) { return self::fromRest($restRunway); }, $restRunways);
    }
}

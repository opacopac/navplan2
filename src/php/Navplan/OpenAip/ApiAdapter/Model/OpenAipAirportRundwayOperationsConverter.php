<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\DomainModel\AirportRunwayOperations;


class OpenAipAirportRundwayOperationsConverter {
    public static function fromRest(int $restAirportRunwayOperations): AirportRunwayOperations {
        return match ($restAirportRunwayOperations) {
            0 => AirportRunwayOperations::ACTIVE,
            1 => AirportRunwayOperations::TEMPORARILY_CLOSED,
            default => AirportRunwayOperations::CLOSED,
        };
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexModel;

use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficAdsbex;


class AdsbexTrafficConverter  {
    public static function fromResponse(array $response, int $acIndex, ITimeService $timeService): TrafficAdsbex {
        $acResponse = $response["ac"][$acIndex];

        return new TrafficAdsbex(
            new TrafficAddress(
                $acResponse["hex"],
                TrafficAddressType::ICAO
            ),
            $acResponse["t"] ?: NULL,
            $acResponse["r"] ?: NULL,
            $acResponse["flight"] ?: NULL,
            $acResponse["opicao"] ?: NULL, // TODO
            [ AdsbexTrafficPositionConverter::fromResponse($response, $acIndex, $timeService) ]
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexRepo;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficAdsbex;


class AdsbexRepoTrafficConverter  {
    public static function fromResponse(array $response, int $acIndex): TrafficAdsbex {
        $acResponse = $response["ac"][$acIndex];

        return new TrafficAdsbex(
            new TrafficAddress(
                $acResponse["icao"],
                TrafficAddressType::ICAO
            ),
            $acResponse["type"] ?: NULL,
            $acResponse["reg"] ?: NULL,
            $acResponse["call"] ?: NULL,
            $acResponse["opicao"] ?: NULL,
            [ AdsbexRepoTrafficPositionConverter::fromResponse($response, $acIndex) ]
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexRepo;

use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAddressType;


class AdsbexRepoTraffic  {
    public static function fromResponse(array $response, int $acIndex): TrafficAdsbex {
        $acResponse = $response["ac"][$acIndex];

        return new TrafficAdsbex(
            new TrafficAddress(
                $acResponse["icao"],
                TrafficAddressType::ICAO
            ),
            $acResponse["type"] ? $acResponse["type"] : NULL,
            $acResponse["reg"] ? $acResponse["reg"] : NULL,
            $acResponse["call"] ? $acResponse["call"] : NULL,
            $acResponse["opicao"] ? $acResponse["opicao"] : NULL,
            [ AdsbexRepoTrafficPosition::fromResponse($response, $acIndex) ]
        );
    }
}

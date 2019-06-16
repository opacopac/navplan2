<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexGateway;

use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class AdsbexTraffic  {
    public static function fromResponse(array $response, int $acIndex): TrafficAdsbex {
        $acResponse = $response["ac"][$acIndex];

        return new TrafficAdsbex(
            $acResponse["icao"],
            TrafficAddressType::ICAO,
            TrafficAcType::UNKNOWN,
            $acResponse["type"] ? $acResponse["type"] : NULL,
            $acResponse["reg"] ? $acResponse["reg"] : NULL,
            $acResponse["call"] ? $acResponse["call"] : NULL,
            $acResponse["opicao"] ? $acResponse["opicao"] : NULL,
            NULL,
            [ AdsbexTrafficPosition::fromResponse($response, $acIndex) ]
        );
    }
}

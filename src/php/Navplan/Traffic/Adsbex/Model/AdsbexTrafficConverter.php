<?php declare(strict_types=1);

namespace Navplan\Traffic\Adsbex\Model;

use Navplan\System\Domain\Service\ITimeService;
use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;
use Navplan\Traffic\Domain\Model\TrafficAdsbex;


class AdsbexTrafficConverter  {
    public static function fromResponse(array $response, int $acIndex, ITimeService $timeService): TrafficAdsbex {
        $acResponse = $response["ac"][$acIndex];

        return new TrafficAdsbex(
            new TrafficAddress(
                $acResponse["hex"],
                TrafficAddressType::ICAO
            ),
            $acResponse["t"] ?? NULL,
            $acResponse["r"] ?? NULL,
            $acResponse["flight"] ?? NULL,
            $acResponse["opicao"] ?? NULL, // TODO
            [ AdsbexTrafficPositionConverter::fromResponse($response, $acIndex, $timeService) ]
        );
    }
}

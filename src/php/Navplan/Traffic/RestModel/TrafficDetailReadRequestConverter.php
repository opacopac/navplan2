<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use InvalidArgumentException;
use Navplan\Traffic\DomainModel\TrafficDetailsReadRequest;


class TrafficDetailReadRequestConverter {
    public static function fromRest(array $rest): TrafficDetailsReadRequest {
        if (!isset($rest["aclist"])) {
            throw new InvalidArgumentException('parameter aclist missing');
        }

        return new TrafficDetailsReadRequest(
            array_map(
                function (array $restTrafficDetail) { return TrafficDetailConverter::fromRest($restTrafficDetail); },
                $rest["aclist"]
            )
        );
    }
}

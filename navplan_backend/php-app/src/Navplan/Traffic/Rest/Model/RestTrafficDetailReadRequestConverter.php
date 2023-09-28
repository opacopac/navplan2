<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;

use InvalidArgumentException;
use Navplan\Traffic\UseCase\ReadTrafficDetails\TrafficDetailsReadRequest;


class RestTrafficDetailReadRequestConverter {
    public static function fromRest(array $rest): TrafficDetailsReadRequest {
        if (!isset($rest["aclist"])) {
            throw new InvalidArgumentException('parameter aclist missing');
        }

        return new TrafficDetailsReadRequest(
            array_map(
                function (array $restTrafficDetail) { return RestTrafficDetailConverter::fromRest($restTrafficDetail); },
                $rest["aclist"]
            )
        );
    }
}

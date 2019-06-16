<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use InvalidArgumentException;
use Navplan\Traffic\Domain\TrafficDetailsReadRequest;


class RestTrafficDetailReadRequest {
    public static function fromRest(array $rest): TrafficDetailsReadRequest {
        if (!isset($rest["aclist"])) {
            throw new InvalidArgumentException('parameter aclist missing');
        }

        return new TrafficDetailsReadRequest(
            array_map(
                function (array $restTrafficDetail) { return RestTrafficDetail::fromRest($restTrafficDetail); },
                $rest["aclist"]
            )
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use InvalidArgumentException;
use Navplan\Traffic\Domain\ReadTrafficDetailsRequest;


class RestReadTrafficDetailRequest {
    public static function fromRest(array $rest): ReadTrafficDetailsRequest {
        if (!isset($rest["aclist"])) {
            throw new InvalidArgumentException('parameter aclist missing');
        }

        return new ReadTrafficDetailsRequest(
            array_map(
                function (array $restTrafficDetail) { return RestTrafficDetail::fromRest($restTrafficDetail); },
                $rest["aclist"]
            )
        );
    }
}

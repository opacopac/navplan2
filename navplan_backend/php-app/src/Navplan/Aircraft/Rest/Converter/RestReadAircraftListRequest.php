<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestReadAircraftListRequest
{
    public function __construct(public string $token)
    {
    }


    public static function fromRest(array $args): RestReadAircraftListRequest
    {
        return new RestReadAircraftListRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}

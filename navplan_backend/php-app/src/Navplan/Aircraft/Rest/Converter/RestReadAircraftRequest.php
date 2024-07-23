<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestReadAircraftRequest
{
    const ARG_ID = "id";
    const ARG_TOKEN = "token";


    public function __construct(
        public int $aircraftId,
        public string $token
    )
    {
    }


    public static function fromRest(array $args): RestReadAircraftRequest
    {
        return new RestReadAircraftRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}

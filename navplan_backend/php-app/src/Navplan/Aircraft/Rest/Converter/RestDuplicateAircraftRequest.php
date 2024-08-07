<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestDuplicateAircraftRequest
{
    public const ARG_TOKEN = "token";
    public const ARG_ID = "id";


    public function __construct(
        public int $aircraftId,
        public string $token
    )
    {
    }


    public static function fromRest(array $args): RestDuplicateAircraftRequest
    {
        return new RestDuplicateAircraftRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}

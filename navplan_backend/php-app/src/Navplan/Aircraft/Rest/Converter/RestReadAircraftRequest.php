<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestReadAircraftRequest
{
    const ARG_ID = "id";


    public function __construct(
        public int $aircraftId,
    )
    {
    }


    public static function fromRest(array $args): RestReadAircraftRequest
    {
        return new RestReadAircraftRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID),
        );
    }
}

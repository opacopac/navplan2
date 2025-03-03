<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestDeleteAircraftRequest
{
    const ARG_ID = "id";


    public function __construct(
        public int $aircraftId
    )
    {
    }


    public static function fromRest(array $args): RestDeleteAircraftRequest
    {
        return new RestDeleteAircraftRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID)
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestDuplicateFlightrouteRequest
{
    public const ARG_ACTION = "action";
    public const VAL_ACTION_DUPLICATE = "duplicate";
    public const ARG_ID = "id";
    public const ARG_TOKEN = "token";


    public function __construct(
        public int $flightrouteId,
        public string $token
    )
    {
    }


    public static function fromRest(array $getArgs, array $postArgs): RestDuplicateFlightrouteRequest
    {
        return new RestDuplicateFlightrouteRequest(
            StringNumberHelper::parseIntOrError($getArgs, self::ARG_ID),
            StringNumberHelper::parseStringOrError($postArgs, self::ARG_TOKEN)
        );
    }
}

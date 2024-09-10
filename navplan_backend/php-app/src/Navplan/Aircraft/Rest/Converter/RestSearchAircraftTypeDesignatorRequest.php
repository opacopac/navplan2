<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Common\StringNumberHelper;


class RestSearchAircraftTypeDesignatorRequest
{
    const ARG_QUERY = "query";


    public function __construct(
        public string $query
    )
    {
    }


    public static function fromRest(array $args): RestSearchAircraftTypeDesignatorRequest
    {
        return new RestSearchAircraftTypeDesignatorRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_QUERY)
        );
    }
}

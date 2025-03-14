<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;


class RestAircraftRequest
{
    public const ARG_AIRCRAFT = "aircraft";


    public function __construct(
        public Aircraft $aircraft
    )
    {
    }


    public static function fromRest(array $args): RestAircraftRequest
    {
        return new RestAircraftRequest(
            RestAircraftConverter::fromRest($args[self::ARG_AIRCRAFT])
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;


class RestUpdateAircraftRequest
{
    public const ARG_AIRCRAFT = "aircraft";


    public function __construct(
        public Aircraft $aircraft
    )
    {
    }


    public static function fromRest(array $args): RestUpdateAircraftRequest
    {
        return new RestUpdateAircraftRequest(
            RestAircraftConverter::fromRest($args[self::ARG_AIRCRAFT])
        );
    }
}

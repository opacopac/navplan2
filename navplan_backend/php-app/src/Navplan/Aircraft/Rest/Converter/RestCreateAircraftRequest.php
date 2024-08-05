<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Common\StringNumberHelper;


class RestCreateAircraftRequest
{
    public const ARG_TOKEN = "token";
    public const ARG_AIRCRAFT = "aircraft";


    public function __construct(
        public Aircraft $aircraft,
        public string $token
    )
    {
    }


    public static function fromRest(array $args): RestCreateAircraftRequest
    {
        return new RestCreateAircraftRequest(
            RestAircraftConverter::fromRest($args[self::ARG_AIRCRAFT]),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Common\StringNumberHelper;


class RestAircraftConverter
{
    public static function fromRest(array $args): Aircraft
    {
        return new Aircraft(
            StringNumberHelper::parseIntOrNull($args, "id"),
            StringNumberHelper::parseStringOrError($args, "registration"),
            StringNumberHelper::parseStringOrError($args, "type"),
        );
    }


    public static function toRest(Aircraft $aircraft): array
    {
        return array(
            "id" => $aircraft->id,
            "registration" => $aircraft->registration,
            "type" => $aircraft->type,
        );
    }


    public static function toRestShort(Aircraft $aircraft): array
    {
        return array(
            "id" => $aircraft->id,
            "registration" => $aircraft->registration,
            "type" => $aircraft->type,
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\XyCoord;
use Navplan\Common\StringNumberHelper;


class RestXyCoordConverter
{
    public static function toRest(?XyCoord $coord): ?array
    {
        if ($coord === null) {
            return null;
        }

        return [$coord->x, $coord->y];
    }


    public static function fromRest(?array $args): ?XyCoord
    {
        if ($args === null || count($args) < 2) {
            return null;
        }

        return new XyCoord(
            StringNumberHelper::parseFloatOrError($args, 0),
            StringNumberHelper::parseFloatOrError($args, 1)
        );
    }
}

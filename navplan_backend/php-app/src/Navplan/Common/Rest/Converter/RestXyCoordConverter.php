<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\XyCoord;
use Navplan\Common\StringNumberHelper;


class RestXyCoordConverter
{
    public static function toRest(XyCoord $coord): array
    {
        return [$coord->x, $coord->y];
    }


    public static function fromRest(array $args): XyCoord
    {
        return new XyCoord(
            StringNumberHelper::parseFloatOrError($args, 0),
            StringNumberHelper::parseFloatOrError($args, 1)
        );
    }
}

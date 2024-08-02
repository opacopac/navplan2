<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Volume;
use Navplan\Common\Domain\Model\VolumeUnit;
use Navplan\Common\StringNumberHelper;


class RestVolumeConverter
{
    public static function toRest(?Volume $volume): ?array
    {
        if (!$volume) {
            return NULL;
        }

        return [
            $volume->value,
            $volume->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Volume
    {
        if (!$args) {
            return NULL;
        }

        return new Volume(
            StringNumberHelper::parseFloatOrError($args, 0),
            VolumeUnit::from(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}

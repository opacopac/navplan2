<?php declare(strict_types=1);

namespace Navplan\Common\RestModel;

use Navplan\Common\DomainModel\Volume;
use Navplan\Common\DomainModel\VolumeUnit;
use Navplan\Common\StringNumberHelper;


class RestVolumeConverter {
    public static function toRest(Volume $volume): array {
        return [
            $volume->value,
            VolumeUnit::toString($volume->unit)
        ];
    }


    public static function fromRest(array $args): Volume {
        return new Volume(
            StringNumberHelper::parseFloatOrError($args, 0),
            VolumeUnit::fromString(StringNumberHelper::parseStringOrError($args, 1)),
        );
    }
}

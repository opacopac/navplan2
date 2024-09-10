<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\AircraftType;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Domain\Model\EngineType;
use Navplan\Common\StringNumberHelper;


class RestAircraftTypeDesignatorConverter
{
    const KEY_ID = "id";
    const KEY_DESIGNATOR = "designator";
    const KEY_MODEL = "model";
    const KEY_MANUFACTURER = "manufacturer";
    const KEY_AC_TYPE = "acType";
    const KEY_ENG_TYPE = "engType";
    const KEY_ENG_COUNT = "engCount";
    const KEY_WTC = "wtc";


    public static function fromRest(array $args): AircraftTypeDesignator
    {
        return new AircraftTypeDesignator(
            StringNumberHelper::parseIntOrNull($args, self::KEY_ID),
            StringNumberHelper::parseStringOrError($args, self::KEY_DESIGNATOR),
            StringNumberHelper::parseStringOrError($args, self::KEY_MODEL),
            StringNumberHelper::parseStringOrError($args, self::KEY_MANUFACTURER),
            AircraftType::from(StringNumberHelper::parseStringOrError($args, self::KEY_AC_TYPE)),
            EngineType::from(StringNumberHelper::parseStringOrError($args, self::KEY_ENG_TYPE)),
            StringNumberHelper::parseIntOrError($args, self::KEY_ENG_COUNT),
            StringNumberHelper::parseStringOrError($args, self::KEY_WTC)
        );
    }


    public static function toRest(AircraftTypeDesignator $acTypeDesignator): array
    {
        return array(
            self::KEY_ID => $acTypeDesignator->id,
            self::KEY_DESIGNATOR => $acTypeDesignator->designator,
            self::KEY_MODEL => $acTypeDesignator->model,
            self::KEY_MANUFACTURER => $acTypeDesignator->manufacturer,
            self::KEY_AC_TYPE => $acTypeDesignator->ac_type->value,
            self::KEY_ENG_TYPE => $acTypeDesignator->engine_type->value,
            self::KEY_ENG_COUNT => $acTypeDesignator->engine_count,
            self::KEY_WTC => $acTypeDesignator->wtc
        );
    }


    public static function toRestList(array $acTypeDesignators): array
    {
        return array_map(function ($acTypeDesignator) {
            return self::toRest($acTypeDesignator);
        }, $acTypeDesignators);
    }


    public static function fromRestList(array $args): array
    {
        return array_map(function ($acTypeDesignator) {
            return self::fromRest($acTypeDesignator);
        }, $args);
    }
}

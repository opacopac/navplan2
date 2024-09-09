<?php declare(strict_types=1);

namespace Navplan\Aircraft\Importer\Model;

use Navplan\Aircraft\Domain\Model\AircraftType;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Domain\Model\EngineType;
use Navplan\Common\StringNumberHelper;


class ImporterAircraftTypeDesignatorConverter
{
    const KEY_DESIGNATOR = "Designator";
    const KEY_MODEL = "ModelFullName";
    const KEY_MANUFACTURER = "ManufacturerCode";
    const KEY_AC_DESCRIPTION = "AircraftDescription";
    const KEY_ENG_TYPE = "EngineType";
    const KEY_ENG_COUNT = "EngineCount";
    const KEY_WTC = "WTC";


    public static function fromJson(array $args): AircraftTypeDesignator
    {
        return new AircraftTypeDesignator(
            0,
            StringNumberHelper::parseStringOrError($args, self::KEY_DESIGNATOR),
            StringNumberHelper::parseStringOrError($args, self::KEY_MODEL),
            StringNumberHelper::parseStringOrError($args, self::KEY_MANUFACTURER),
            self::parseAircraftType(StringNumberHelper::parseStringOrError($args, self::KEY_AC_DESCRIPTION)),
            self::parseEngineType(StringNumberHelper::parseStringOrError($args, self::KEY_ENG_TYPE)),
            StringNumberHelper::parseIntOrZero($args, self::KEY_ENG_COUNT),
            StringNumberHelper::parseStringOrError($args, self::KEY_WTC)
        );
    }


    private static function parseAircraftType(string $description): AircraftType
    {
        switch ($description) {
            case "Amphibian":
                return AircraftType::AMPHIBIAN;
            case "Gyrocopter":
                return AircraftType::GYROCOPTER;
            case "Helicopter":
                return AircraftType::HELICOPTER;
            case "LandPlane":
                return AircraftType::LANDPLANE;
            case "SeaPlane":
                return AircraftType::SEAPLANE;
            case "Tiltrotor":
                return AircraftType::TILTROTOR;
            case "Special":
                return AircraftType::SPECIAL;
            default:
                return AircraftType::UNKNOWN;
        }
    }


    private static function parseEngineType(string $description): EngineType
    {
        switch ($description) {
            case "Electric":
                return EngineType::ELECTRIC;
            case "Jet" :
                return EngineType::JET;
            case "Piston":
                return EngineType::PISTON;
            case "Rocket":
                return EngineType::ROCKET;
            case "Turboprop/Turboshaft":
                return EngineType::TURBOPROP;
            default:
                return EngineType::UNKNONW;
        }
    }
}

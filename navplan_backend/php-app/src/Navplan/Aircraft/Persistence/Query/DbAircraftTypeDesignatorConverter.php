<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\AircraftType;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Domain\Model\EngineType;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Domain\Model\IDbResult;


class DbAircraftTypeDesignatorConverter
{
    public static function fromDbRow(array $row): AircraftTypeDesignator
    {
        return new AircraftTypeDesignator(
            intval($row[DbTableAircraftTypeDesignator::COL_ID]),
            $row[DbTableAircraftTypeDesignator::COL_DESIGNATOR],
            $row[DbTableAircraftTypeDesignator::COL_MODEL],
            $row[DbTableAircraftTypeDesignator::COL_MANUFACTURER],
            AircraftType::from($row[DbTableAircraftTypeDesignator::COL_AC_TYPE]),
            EngineType::from($row[DbTableAircraftTypeDesignator::COL_ENG_TYPE]),
            intval($row[DbTableAircraftTypeDesignator::COL_ENG_COUNT]),
            $row[DbTableAircraftTypeDesignator::COL_WTC]
        );
    }


    /**
     * @param IDbResult $result
     * @return AircraftTypeDesignator[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $acTypeDesignators = [];
        while ($row = $result->fetch_assoc()) {
            $acTypeDesignators[] = DbAircraftTypeDesignatorConverter::fromDbRow($row);
        }

        return $acTypeDesignators;
    }
}

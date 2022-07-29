<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Query;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\FrequencyUnit;
use Navplan\Enroute\Domain\Model\Navaid;
use Navplan\Enroute\Domain\Model\NavaidType;
use Navplan\Enroute\Persistence\Model\DbTableNavaid;
use Navplan\System\DomainModel\IDbResult;


class DbNavaidSearchQueryCommon {
    public static function fromDbResult(IDbResult $result): array {
        $navaids = [];
        while ($row = $result->fetch_assoc()) {
            $navaids[] = self::fromDbRow($row);
        }
        return $navaids;
    }


    public static function fromDbRow(array $row): Navaid {
        return new Navaid(
            intval($row[DbTableNavaid::COL_ID]),
            NavaidType::from($row[DbTableNavaid::COL_TYPE]),
            $row[DbTableNavaid::COL_KUERZEL],
            $row[DbTableNavaid::COL_NAME],
            DbPosition2dConverter::fromDbRow($row),
            new Altitude(floatval($row[DbTableNavaid::COL_ELEVATION]), AltitudeUnit::M, AltitudeReference::MSL),
            new Frequency(floatval($row[DbTableNavaid::COL_FREQUENCY]), $row[DbTableNavaid::COL_TYPE] === "NDB" ? FrequencyUnit::KHZ : FrequencyUnit::MHZ),
            floatval($row[DbTableNavaid::COL_DECLINATION]),
            boolval($row[DbTableNavaid::COL_TRUENORTH])
        );
    }
}

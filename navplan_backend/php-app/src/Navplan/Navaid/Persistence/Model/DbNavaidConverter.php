<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\Domain\Model\Frequency;
use Navplan\Common\Domain\Model\FrequencyUnit;
use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\Navaid\Domain\Model\Navaid;
use Navplan\Navaid\Domain\Model\NavaidType;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbNavaidConverter {
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

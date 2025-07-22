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
        $r = new DbRowNavaid($row);
        $freqType = $r->getType() === "NDB" ? FrequencyUnit::KHZ : FrequencyUnit::MHZ;

        return new Navaid(
            $r->getId(),
            NavaidType::from($r->getType()),
            $r->getKuerzel(),
            $r->getName(),
            $r->getPosition(),
            Altitude::fromMtAmsl($r->getElevation()),
            new Frequency(floatval($r->getFrequency()), $freqType),
            $r->getDeclination(),
            $r->isTrueNorth()
        );
    }
}

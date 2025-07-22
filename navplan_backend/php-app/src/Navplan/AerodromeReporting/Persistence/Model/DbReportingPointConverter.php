<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbReportingPointConverter
{
    /**
     * @param IDbResult $result
     * @return ReportingPoint[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $reportingPoints = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoints[] = self::fromDbRow2($row);
        }
        return $reportingPoints;
    }


    public static function fromDbRow2(array $row): ReportingPoint
    {
        $r = new DbRowReportingPoints($row);

        return new ReportingPoint(
            $r->getId(),
            $r->getType(),
            $r->getAirportIcao(),
            $r->getName(),
            $r->isHeli(),
            $r->isInbdComp(),
            $r->isOutbdComp(),
            Length::fromFt($r->getMinFt()),
            Length::fromFt($r->getMaxFt()),
            $r->getPosition(),
            Ring2d::createFromString($r->getPolygon())
        );
    }
}

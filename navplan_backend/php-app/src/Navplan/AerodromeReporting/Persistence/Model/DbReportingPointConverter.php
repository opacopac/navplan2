<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<ReportingPoint>
 */
class DbReportingPointConverter extends DbEntityConverter
{
    public static function create(): DbReportingPointConverter
    {
        return new DbReportingPointConverter();
    }


    public function fromDbRow(array $row): ReportingPoint
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

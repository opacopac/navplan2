<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<ReportingPoint, DbTableReportingPoints>
 */
class DbReportingPointConverter extends DbEntityConverter
{
    public static function create(): DbReportingPointConverter
    {
        return new DbReportingPointConverter();
    }


    /**
     * @param DbTableReportingPoints $table
     * @param array $row
     * @return ReportingPoint
     */
    public function fromDbRow($table, array $row): ReportingPoint
    {
        $r = new DbRowReportingPoints($table, $row);

        return new ReportingPoint(
            $r->getId(),
            $r->getType(),
            $r->getAirportIcao(),
            $r->getName(),
            $r->isHeli() ?? false,
            $r->isInbdComp() ?? false,
            $r->isOutbdComp() ?? false,
            Length::fromFt($r->getMinFt()),
            Length::fromFt($r->getMaxFt()),
            $r->getPosition(),
            Ring2d::createFromString($r->getPolygon())
        );
    }
}

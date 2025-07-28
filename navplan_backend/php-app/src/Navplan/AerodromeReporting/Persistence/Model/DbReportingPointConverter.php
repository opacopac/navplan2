<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<ReportingPoint>
 */
class DbReportingPointConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableReportingPoints $table)
    {
    }


    public function fromDbRow(array $row): ReportingPoint
    {
        $r = new DbRowReportingPoints($this->table, $row);

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
            Position2d::fromLonLat($r->getLongitude(), $r->getLatitude()),
            Ring2d::fromString($r->getPolygon())
        );
    }
}

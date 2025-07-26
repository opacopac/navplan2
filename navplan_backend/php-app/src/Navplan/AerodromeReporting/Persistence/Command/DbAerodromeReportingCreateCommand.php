<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Command;

use Navplan\AerodromeReporting\Domain\Command\IAerodromeReportingCreateCommand;
use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Db\Domain\Model\DbException;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAerodromeReportingCreateCommand implements IAerodromeReportingCreateCommand
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @throws DbException
     */
    public function create(ReportingPoint $reportingPoint, int $userId): ReportingPoint
    {
        $t = new DbTableReportingPoints();
        $statement = $this->dbService->getInsertCommandBuilder()
            ->insertInto($t)
            ->addCol($t->colType(), $reportingPoint->type)
            ->addCol($t->colAdIcao(), $reportingPoint->airport_icao)
            ->addCol($t->colName(), $reportingPoint->name)
            ->addCol($t->colHeli(), $reportingPoint->heli)
            ->addCol($t->colInbdComp(), $reportingPoint->inbd_comp)
            ->addCol($t->colOutbdComp(), $reportingPoint->outbd_comp)
            ->addCol($t->colMinFt(), $reportingPoint->alt_min?->ft ?? NULL)
            ->addCol($t->colMaxFt(), $reportingPoint->alt_max?->ft ?? NULL)
            ->addCol($t->colLat(), $reportingPoint->position?->latitude ?? NULL)
            ->addCol($t->colLon(), $reportingPoint->position?->longitude ?? NULL)
            ->addCol($t->colPolygon(), $reportingPoint->polygon?->toString() ?? "")
            ->buildAndBindStatement();

        $statement->execute("error creating reporting point");
        $reportingPoint->id = $statement->getInsertId();

        return $reportingPoint;
    }
}

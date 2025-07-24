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
            ->setValue($t->colType(), $reportingPoint->type)
            ->setValue($t->colAdIcao(), $reportingPoint->airport_icao)
            ->setValue($t->colName(), $reportingPoint->name)
            ->setValue($t->colHeli(), $reportingPoint->heli)
            ->setValue($t->colInbdComp(), $reportingPoint->inbd_comp)
            ->setValue($t->colOutbdComp(), $reportingPoint->outbd_comp)
            ->setValue($t->colMinFt(), $reportingPoint->alt_min?->ft ?? NULL)
            ->setValue($t->colMaxFt(), $reportingPoint->alt_max?->ft ?? NULL)
            ->setValue($t->colLat(), $reportingPoint->position?->latitude ?? NULL)
            ->setValue($t->colLon(), $reportingPoint->position?->longitude ?? NULL)
            ->setValue($t->colPolygon(), $reportingPoint->polygon?->toString() ?? "")
            ->buildAndBindStatement();

        $statement->execute("error creating reporting point");
        $reportingPoint->id = $statement->getInsertId();

        return $reportingPoint;
    }
}

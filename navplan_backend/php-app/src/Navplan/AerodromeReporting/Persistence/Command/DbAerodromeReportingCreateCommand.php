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
            ->setColValue($t->colType(), $reportingPoint->type)
            ->setColValue($t->colAdIcao(), $reportingPoint->airport_icao)
            ->setColValue($t->colName(), $reportingPoint->name)
            ->setColValue($t->colHeli(), $reportingPoint->heli)
            ->setColValue($t->colInbdComp(), $reportingPoint->inbd_comp)
            ->setColValue($t->colOutbdComp(), $reportingPoint->outbd_comp)
            ->setColValue($t->colMinFt(), $reportingPoint->alt_min?->ft ?? NULL)
            ->setColValue($t->colMaxFt(), $reportingPoint->alt_max?->ft ?? NULL)
            ->setColValue($t->colLat(), $reportingPoint->position?->latitude ?? NULL)
            ->setColValue($t->colLon(), $reportingPoint->position?->longitude ?? NULL)
            ->setColValue($t->colPolygon(), $reportingPoint->polygon?->toString() ?? "")
            ->buildAndBindStatement();

        $statement->execute("error creating reporting point");
        $reportingPoint->id = $statement->getInsertId();

        return $reportingPoint;
    }
}

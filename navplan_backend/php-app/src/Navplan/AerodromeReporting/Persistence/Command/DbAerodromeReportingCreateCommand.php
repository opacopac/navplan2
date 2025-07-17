<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Command;

use Navplan\AerodromeReporting\Domain\Command\IAerodromeReportingCreateCommand;
use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAerodromeReportingCreateCommand implements IAerodromeReportingCreateCommand
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function create(ReportingPoint $reportingPoint, int $userId): ReportingPoint
    {
        $query = $this->getInsertSql($reportingPoint, $userId);
        $this->dbService->execCUDQuery($query, "error creating reporting point");
        $reportingPoint->id = $this->dbService->getInsertId();

        return $reportingPoint;
    }


    private function getInsertSql(ReportingPoint $reportingPoint, int $userId): string
    {
        $query = "INSERT INTO " . DbTableReportingPoints::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableReportingPoints::COL_TYPE,
            DbTableReportingPoints::COL_AD_ICAO,
            DbTableReportingPoints::COL_NAME,
            DbTableReportingPoints::COL_HELI,
            DbTableReportingPoints::COL_INBD_COMP,
            DbTableReportingPoints::COL_OUTBD_COMP,
            DbTableReportingPoints::COL_MIN_FT,
            DbTableReportingPoints::COL_MAX_FT,
            DbTableReportingPoints::COL_LAT,
            DbTableReportingPoints::COL_LON,
            DbTableReportingPoints::COL_POLYGON,
            DbTableReportingPoints::COL_EXTENT
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbStringValue($this->dbService, $reportingPoint->type),
            DbHelper::getDbStringValue($this->dbService, $reportingPoint->airport_icao),
            DbHelper::getDbStringValue($this->dbService, $reportingPoint->name),
            DbHelper::getDbBoolValue($reportingPoint->heli),
            DbHelper::getDbBoolValue($reportingPoint->inbd_comp),
            DbHelper::getDbBoolValue($reportingPoint->outbd_comp),
            DbHelper::getDbIntValue($reportingPoint->alt_min?->ft ?? NULL),
            DbHelper::getDbIntValue($reportingPoint->alt_max?->ft ?? NULL),
            DbHelper::getDbFloatValue($reportingPoint->position?->latitude ?? NULL),
            DbHelper::getDbFloatValue($reportingPoint->position?->longitude ?? NULL),
            DbHelper::getDbStringValue($this->dbService, $reportingPoint->polygon?->toString() ?? ""),
        ]);
        $query .= ")";

        return $query;
    }
}

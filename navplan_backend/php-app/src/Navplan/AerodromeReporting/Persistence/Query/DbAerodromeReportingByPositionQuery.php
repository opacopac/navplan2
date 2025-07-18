<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Domain\Service\IDbService;


class DbAerodromeReportingByPositionQuery implements IAerodromeReportingByPositionQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(Position2d $position, float $maxRadius_deg, int $maxResults): array
    {
        /*$query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableReportingPoints::TABLE_NAME)
            ->whereAll([
                [DbTableReportingPoints::COL_LAT, DbWhereOp::GT, $position->latitude - $maxRadius_deg],
                [DbTableReportingPoints::COL_LAT, DbWhereOp::LT, $position->latitude + $maxRadius_deg],
                [DbTableReportingPoints::COL_LON, DbWhereOp::GT, $position->longitude - $maxRadius_deg],
                [DbTableReportingPoints::COL_LON, DbWhereOp::LT, $position->longitude + $maxRadius_deg],
            ])
            ->orderBy("((" . DbTableReportingPoints::COL_LAT . " - " . $position->latitude . ")"
                . " * (" . DbTableReportingPoints::COL_LAT . " - " . $position->latitude . ")"
                . " + (" . DbTableReportingPoints::COL_LON . " - " . $position->longitude . ")"
                . " * (" . DbTableReportingPoints::COL_LON . " - " . $position->longitude . "))",
                DbSortDirection::ASC
            )
            ->limit($maxResults)
            ->build();*/

        $query = "SELECT * FROM " . DbTableReportingPoints::TABLE_NAME;
        $query .= " WHERE";
        $query .= "  " . DbTableReportingPoints::COL_LAT . " > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND " . DbTableReportingPoints::COL_LAT . " < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND " . DbTableReportingPoints::COL_LON . " > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND " . DbTableReportingPoints::COL_LON . " < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((" . DbTableReportingPoints::COL_LAT . " - " . $position->latitude . ") * (" . DbTableReportingPoints::COL_LAT . " - " . $position->latitude
            . ") + (" . DbTableReportingPoints::COL_LON . " - " . $position->longitude . ") * (" . DbTableReportingPoints::COL_LON . " - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching reporting points by position");

        return DbReportingPointConverter::fromDbResult($result);
    }
}

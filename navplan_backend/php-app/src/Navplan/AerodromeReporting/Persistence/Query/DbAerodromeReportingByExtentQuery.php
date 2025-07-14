<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAerodromeReportingByExtentQuery implements IAerodromeReportingByExtentQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(Extent2d $extent): array
    {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT * FROM " . DbTableReportingPoints::TABLE_NAME;
        $query .= " WHERE MBRIntersects(" . DbTableReportingPoints::COL_EXTENT . ", " . $extentPoly . ")";

        $result = $this->dbService->execMultiResultQuery($query, "error reading reporting points by extent");

        return DbReportingPointConverter::fromDbResult($result);
    }
}

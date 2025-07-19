<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Domain\Model\DbWhereOpGeo;
use Navplan\System\Domain\Service\IDbService;


class DbAerodromeReportingByExtentQuery implements IAerodromeReportingByExtentQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(Extent2d $extent): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableReportingPoints::TABLE_NAME)
            ->whereGeo(DbTableReportingPoints::COL_EXTENT, DbWhereOpGeo::INTERSECTS_MBR, $extent)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading reporting points by extent");

        return DbReportingPointConverter::fromDbResult($result);
    }
}

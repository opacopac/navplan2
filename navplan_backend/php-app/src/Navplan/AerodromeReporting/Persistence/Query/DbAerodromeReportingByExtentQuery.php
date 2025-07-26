<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;


class DbAerodromeReportingByExtentQuery implements IAerodromeReportingByExtentQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(Extent2d $extent): array
    {
        $t = new DbTableReportingPoints();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondGeo::create($t->colExtent(), DbCondOpGeo::INTERSECTS_MBR, $extent))
            ->where(DbCondGeo::create($t->colExtent(), DbCondOpGeo::INTERSECTS_MBR, $extent))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading reporting points by extent");

        return DbReportingPointConverter::create()
            ->fromDbResult($t, $result);
    }
}

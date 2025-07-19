<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAerodromeReportingByIcaoQuery implements IAerodromeReportingByIcaoQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(string $airportIcao): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableReportingPoints::TABLE_NAME)
            ->whereEquals(DbTableReportingPoints::COL_AD_ICAO, $airportIcao)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading reporting points by airport ICAO");

        return DbReportingPointConverter::fromDbResult($result);
    }
}

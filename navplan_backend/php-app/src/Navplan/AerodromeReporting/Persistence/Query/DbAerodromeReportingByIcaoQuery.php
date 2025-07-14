<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Query;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Persistence\Model\DbReportingPointConverter;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAerodromeReportingByIcaoQuery implements IAerodromeReportingByIcaoQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(string $airportIcao): array
    {
        $query = "SELECT * FROM " . DbTableReportingPoints::TABLE_NAME;
        $query .= " WHERE " . DbTableReportingPoints::COL_AD_ICAO . "=" . DbHelper::getDbStringValue($this->dbService, $airportIcao);

        $result = $this->dbService->execMultiResultQuery($query, "error reading reporting points by airport ICAO");

        return DbReportingPointConverter::fromDbResult($result);
    }
}

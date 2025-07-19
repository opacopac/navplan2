<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbFlightrouteListQuery implements IFlightrouteListQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $query = "SELECT * FROM " . DbTableFlightroute::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightroute::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $query .= " ORDER BY " . DbTableFlightroute::COL_TITLE . " ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading flightroute list");

        return DbFlightrouteConverter::fromDbResult($result);
    }
}

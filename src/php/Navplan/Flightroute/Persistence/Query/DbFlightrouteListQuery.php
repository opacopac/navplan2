<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Query;

use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\Flightroute\Persistence\Model\DbTableFlightroute;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\DomainModel\User;


class DbFlightrouteListQuery implements IFlightrouteListQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function readList(User $user): array {
        $query = "SELECT * FROM " . DbTableFlightroute::TABLE_NAME;
        $query .= " WHERE " . DbTableFlightroute::COL_ID_USER . "=" . DbHelper::getDbIntValue($user->id);
        $query .= " ORDER BY " . DbTableFlightroute::COL_TITLE . " ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading flightroute list");

        return DbFlightrouteConverter::fromDbResult($result);
    }
}

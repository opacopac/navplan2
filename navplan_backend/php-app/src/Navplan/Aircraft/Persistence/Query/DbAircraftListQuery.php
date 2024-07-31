<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAircraftListQuery implements IAircraftListQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $query = "SELECT * FROM " . DbTableAircraft::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $query .= " ORDER BY " . DbTableAircraft::COL_REGISTRATION . " ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft list");

        return DbAircraftConverter::fromDbResult($result);
    }
}

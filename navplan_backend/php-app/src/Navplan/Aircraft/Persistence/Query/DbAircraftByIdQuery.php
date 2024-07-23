<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\User\Domain\Model\User;


class DbAircraftByIdQuery implements IAircraftByIdQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function read(int $aircraftId, User $user): ?Aircraft
    {
        $query = "SELECT * FROM " . DbTableAircraft::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraft::COL_ID . "=" . DbHelper::getDbIntValue($aircraftId);
        $query .= " AND " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($user->id);

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading aircraft");

        $aircraft = DbAircraftConverter::fromDbRow($result->fetch_assoc());

        return $aircraft;
    }
}

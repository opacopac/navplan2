<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Persistence\Model\DbAircraftConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


class DbAircraftListQuery implements IAircraftListQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableAircraft::TABLE_NAME)
            ->whereEquals(DbTableAircraft::COL_ID_USER, $userId)
            ->orderBy(DbTableAircraft::COL_REGISTRATION, DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft list");

        return DbAircraftConverter::fromDbResult($result);
    }
}

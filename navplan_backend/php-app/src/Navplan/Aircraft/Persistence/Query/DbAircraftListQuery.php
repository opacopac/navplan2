<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Persistence\Model\DbAircraftConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


readonly class DbAircraftListQuery implements IAircraftListQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $t = new DbTableAircraft();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->whereEquals($t->colIdUser(), $userId)
            ->orderBy($t->colRegistration(), DbSortOrder::ASC)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading aircraft list");
        $converter = new DbAircraftConverter($t);

        return $converter->fromDbResult($result);
    }
}

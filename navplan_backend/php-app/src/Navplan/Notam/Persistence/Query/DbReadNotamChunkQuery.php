<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Domain\Query\IReadNotamChunkQuery;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\Notam\Persistence\Model\DbTableNotam;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;


readonly class DbReadNotamChunkQuery implements IReadNotamChunkQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    /**
     * @param int $lastNotamId
     * @param int $maxCount
     * @return Notam[]
     */
    public function readNotamChunk(int $lastNotamId, int $maxCount): array
    {
        $t = new DbTableNotam();

        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondSimple::create($t->colId(), DbCondOp::GT, $lastNotamId))
            ->orderBy($t->colId(), DbSortOrder::ASC)
            ->limit($maxCount)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading notam chunk from db");
        $converter = new DbNotamConverter($t);

        return $converter->fromDbResult($result);
    }
}

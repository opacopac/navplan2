<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Notam\Domain\Query\IReadNotamsByKeyQuery;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\Notam\Persistence\Model\DbTableNotam;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


readonly class DbReadNotamsByKeyQuery implements IReadNotamsByKeyQuery
{
    public function __construct(private IDbService $dbService)
    {
    }


    /**
     * @param string $notamKey
     * @return array
     */
    public function readNotamsByKey(string $notamKey): array
    {
        $t = new DbTableNotam();

        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondSimple::create($t->colNotamId(), DbCondOp::EQ, $notamKey))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading notams");
        $converter = new DbNotamConverter($t);

        return $converter->fromDbResult($result);

    }
}

<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Persistence\Model\DbNavaidConverter;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereText;


class DbNavaidSearchByTextQuery implements INavaidSearchByTextQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByText(string $searchText, int $maxResults): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableNavaid::TABLE_NAME)
            ->whereAny(
                DbWhereText::create(DbTableNavaid::COL_KUERZEL, DbWhereOpTxt::LIKE_PREFIX, $searchText),
                DbWhereText::create(DbTableNavaid::COL_NAME, DbWhereOpTxt::LIKE_PREFIX, $searchText)
            )
            ->orderBy(
                "CASE WHEN " . DbTableNavaid::COL_COUNTRY . " = 'CH' THEN 1 ELSE 2 END", // TODO: query builder
                DbSortOrder::ASC
            )
            ->orderBy(DbTableNavaid::COL_KUERZEL, DbSortOrder::ASC)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by text");

        return DbNavaidConverter::fromDbResult($result);
    }
}

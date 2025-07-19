<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Query;

use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Persistence\Model\DbNavaidConverter;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCaseBuilder;


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
                DbCondText::create(DbTableNavaid::COL_KUERZEL, DbCondOpTxt::LIKE_PREFIX, $searchText),
                DbCondText::create(DbTableNavaid::COL_NAME, DbCondOpTxt::LIKE_PREFIX, $searchText)
            )
            ->orderBy(
                MySqlDbCaseBuilder::create($this->dbService)
                    ->whenEquals(DbTableNavaid::COL_COUNTRY, "CH", "1")
                    ->else("2")
                    ->build(),
                DbSortOrder::ASC
            )
            ->orderBy(DbTableNavaid::COL_KUERZEL, DbSortOrder::ASC)
            ->limit($maxResults)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by text");

        return DbNavaidConverter::fromDbResult($result);
    }
}

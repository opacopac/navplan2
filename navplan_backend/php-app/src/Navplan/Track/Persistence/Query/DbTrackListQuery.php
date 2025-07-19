<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Query;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\Track\Domain\Query\ITrackListQuery;
use Navplan\Track\Persistence\Model\DbTableTrack;
use Navplan\Track\Persistence\Model\DbTrackConverter;


class DbTrackListQuery implements ITrackListQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DBTableTrack::TABLE_NAME)
            ->whereEquals(DbTableTrack::COL_ID_USER, $userId)
            ->orderBy(DBTableTrack::COL_TIMESTAMP, DbSortOrder::DESC)
            ->build();


        $result = $this->dbService->execMultiResultQuery($query, "error reading track list");

        return DbTrackConverter::fromDbResult($result, false);
    }
}

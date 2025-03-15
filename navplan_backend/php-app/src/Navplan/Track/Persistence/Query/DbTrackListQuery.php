<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Query;

use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\Track\Domain\Query\ITrackListQuery;
use Navplan\Track\Persistence\Model\DbTableTrack;
use Navplan\Track\Persistence\Model\DbTrackConverter;


class DbTrackListQuery implements ITrackListQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(int $userId): array
    {
        $query = "SELECT * FROM " . DbTableTrack::TABLE_NAME;
        $query .= " WHERE " . DbTableTrack::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $query .= " ORDER BY " . DbTableTrack::COL_TIMESTAMP . " DESC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading track list");

        return DbTrackConverter::fromDbResult($result);
    }
}

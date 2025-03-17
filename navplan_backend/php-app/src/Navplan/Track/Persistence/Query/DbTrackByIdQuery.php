<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Query;

use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\Track\Domain\Model\Track;
use Navplan\Track\Domain\Query\ITrackByIdQuery;
use Navplan\Track\Persistence\Model\DbTableTrack;
use Navplan\Track\Persistence\Model\DbTrackConverter;


class DbTrackByIdQuery implements ITrackByIdQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function read(int $trackId, int $userId): ?Track
    {
        $query = "SELECT * FROM " . DbTableTrack::TABLE_NAME;
        $query .= " WHERE " . DbTableTrack::COL_ID . "=" . DbHelper::getDbIntValue($trackId);
        $query .= " AND " . DbTableTrack::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading track");

        $track = DbTrackConverter::fromDbRow($result->fetch_assoc(), true);

        var_dump($track);

        return $track;
    }
}

<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Command;

use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;
use Navplan\Track\Domain\Command\ITrackDeleteCommand;
use Navplan\Track\Persistence\Model\DbTableTrack;


class DbTrackDeleteCommand implements ITrackDeleteCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function delete(int $trackId, int $userId)
    {
        $query = "DELETE FROM " . DbTableTrack::TABLE_NAME;
        $query .= " WHERE " . DbTableTrack::COL_ID . "=" . DbHelper::getDbIntValue($trackId);
        $query .= " AND " . DbTableTrack::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $this->dbService->execCUDQuery($query, "error deleting track");
    }
}

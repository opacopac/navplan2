<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Command;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\Track\Domain\Command\ITrackUpdateCommand;
use Navplan\Track\Domain\Model\Track;
use Navplan\Track\Persistence\Model\DbTableTrack;


class DbTrackUpdateCommand implements ITrackUpdateCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public
    function update(Track $track, int $userId): Track
    {
        $query = $this->getUpdateSql($track, $userId);
        $this->dbService->execCUDQuery($query, "error updating track");

        return $track;
    }


    public
    function getUpdateSql(Track $track, int $userId): string
    {
        $query = "UPDATE " . DbTableTrack::TABLE_NAME . " SET ";
        $query .= join(", ", [
            DbTableTrack::COL_NAME . "=" . DbHelper::getDbStringValue($this->dbService, $track->name),
        ]);
        $query .= " WHERE " . DbTableTrack::COL_ID . "=" . DbHelper::getDbIntValue($track->id);
        $query .= "  AND";
        $query .= " " . DbTableTrack::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        return $query;
    }
}

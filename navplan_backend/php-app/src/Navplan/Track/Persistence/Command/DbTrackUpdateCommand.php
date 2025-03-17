<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Command;

use Navplan\Common\Persistence\Model\DbPosition4dConverter;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;
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
            DbTableTrack::COL_POSITIONS . "=" . DbPosition4dConverter::toDbValueFromList($this->dbService, $track->positionList),
        ]);
        $query .= " WHERE " . DbTableTrack::COL_ID . "=" . DbHelper::getDbIntValue($track->id);
        $query .= "  AND";
        $query .= " " . DbTableTrack::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        return $query;
    }
}

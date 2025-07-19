<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Command;

use Navplan\Common\Persistence\Model\DbPosition4dConverter;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\Track\Domain\Command\ITrackCreateCommand;
use Navplan\Track\Domain\Model\Track;
use Navplan\Track\Persistence\Model\DbTableTrack;


class DbTrackCreateCommand implements ITrackCreateCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function create(Track $track, int $userId): Track
    {
        $query = $this->getInsertSql($track, $userId);
        $this->dbService->execCUDQuery($query, "error creating track");
        $track->id = $this->dbService->getInsertId();

        return $track;
    }


    private function getInsertSql(Track $track, int $userId): string
    {
        $query = "INSERT INTO " . DbTableTrack::TABLE_NAME . " (";
        $query .= join(",", [
            DbTableTrack::COL_ID_USER,
            DbTableTrack::COL_NAME,
            DbTableTrack::COL_POSITIONS
        ]);
        $query .= ") VALUES (";
        $query .= join(", ", [
            DbHelper::getDbIntValue($userId),
            DbHelper::getDbStringValue($this->dbService, $track->name),
            DbPosition4dConverter::toDbValueFromList($this->dbService, $track->positionList)
        ]);
        $query .= ")";

        return $query;
    }
}

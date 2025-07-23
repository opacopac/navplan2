<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Query;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\Track\Domain\Model\Track;
use Navplan\Track\Domain\Query\ITrackByIdQuery;
use Navplan\Track\Persistence\Model\DbTableTrack;
use Navplan\Track\Persistence\Model\DbTrackConverter;


class DbTrackByIdQuery implements ITrackByIdQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(int $trackId, int $userId): ?Track
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DBTableTrack::TABLE_NAME)
            ->where(DbCondMulti::all(
                DbCondSimple::equals(DbTableTrack::COL_ID, $trackId),
                DbCondSimple::equals(DbTableTrack::COL_ID_USER, $userId)
            ))
            ->build();

        $result = $this->dbService->execSingleResultQuery($query, true, "error reading track");

        $track = DbTrackConverter::fromDbRow($result->fetch_assoc(), true);

        return $track;
    }
}

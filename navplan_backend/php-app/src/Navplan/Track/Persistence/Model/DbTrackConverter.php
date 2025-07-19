<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Model;

use Navplan\Common\Persistence\Model\DbPosition4dConverter;
use Navplan\Common\Persistence\Model\DbTimestampConverter;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\Track\Domain\Model\Track;


class DbTrackConverter
{
    /**
     * @param IDbResult $result
     * @return Track[]
     */
    public static function fromDbResult(IDbResult $result, bool $includePositions): array
    {
        $tracks = [];
        while ($row = $result->fetch_assoc()) {
            $tracks[] = self::fromDbRow($row, $includePositions);
        }

        return $tracks;
    }


    public static function fromDbRow(array $row, bool $includePositions): Track
    {
        return new Track(
            intval($row["id"]),
            $row["name"],
            $includePositions
                ? DbPosition4dConverter::fromDbRowToList($row, DbTableTrack::COL_POSITIONS)
                : [],
            DbTimestampConverter::fromDbRow($row, DbTableTrack::COL_TIMESTAMP)
        );
    }
}

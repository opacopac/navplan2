<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Model;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position4d;
use Navplan\Common\DomainModel\Timestamp;
use Navplan\System\Domain\Model\IDbResult;
use Navplan\Track\Domain\Model\Track;


class DbTrackConverter {
    /**
     * @param IDbResult $result
     * @return Track[]
     */
    public static function fromDbResult(IDbResult $result): array {
        $tracks = [];
        while ($row = $result->fetch_assoc()) {
            $tracks[] = self::fromDbRow($row);
        }

        return $tracks;
    }


    public static function fromDbRow(array $row): Track {
        return new Track(
            intval($row["id"]),
            $row["name"],
            self::readPositionsFromDbRow($row),
            Timestamp::fromS(strtotime($row["timestamp"])),
        );
    }


    /**
     * @param array $row
     * @return Position4d[]
     */
    private static function readPositionsFromDbRow(array $row): array {
        $positions = json_decode($row["positions"], true);

        return array_map(
            function ($pos) {
                return new Position4d(
                    $pos[1],
                    $pos[0],
                    Altitude::fromMtAmsl($pos[2]),
                    Timestamp::fromS($pos[3])
                );
            },
            $positions
        );
    }
}

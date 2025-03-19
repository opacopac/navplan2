<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;


use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position4d;
use Navplan\Common\Domain\Model\Timestamp;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;

class DbPosition4dConverter
{
    /**
     * @param array $row
     * @param string $colName
     * @return Position4d[]
     */
    public static function fromDbRowToList(array $row, string $colName): array
    {
        $positions = json_decode($row[$colName]);

        $positions4d = array_map(
            function ($pos) {
                if (!isset($pos[2])) {
                    return NULL; // skip entries without altitude
                }

                return new Position4d(
                    $pos[1],
                    $pos[0],
                    Altitude::fromMtAmsl($pos[2]),
                    Timestamp::fromS($pos[3])
                );
            },
            $positions
        );

        return
            array_values(
                array_filter($positions4d, function ($pos) {
                    return $pos !== NULL;
                })
            );
    }


    /**
     * @param IDbService $dbService
     * @param Position4d[] $position4dList
     * @return string
     */
    public static function toDbValueFromList(IDbService $dbService, array $position4dList): string
    {
        $positions = array_map(
            function ($pos) {
                return [
                    $pos->longitude,
                    $pos->latitude,
                    $pos->altitude->value,
                    $pos->timestamp->toS()
                ];
            },
            $position4dList
        );

        return "'" . DbHelper::getDbStringValue($dbService, json_encode($positions)) . "'";
    }
}

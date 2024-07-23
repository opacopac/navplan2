<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\Aircraft;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Domain\Model\IDbResult;


class DbAircraftConverter
{
    public static function fromDbRow(array $row): Aircraft
    {
        return new Aircraft(
            intval($row[DbTableAircraft::COL_ID]),
            $row[DbTableAircraft::COL_REGISTRATION],
            $row[DbTableAircraft::COL_TYPE],
        );
    }


    /**
     * @param IDbResult $result
     * @return Aircraft[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $routes = [];
        while ($row = $result->fetch_assoc()) {
            $routes[] = DbAircraftConverter::fromDbRow($row);
        }

        return $routes;
    }
}

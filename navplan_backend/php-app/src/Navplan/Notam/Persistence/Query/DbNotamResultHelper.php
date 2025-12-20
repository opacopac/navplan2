<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbNotamResultHelper
{
    /**
     * @param IDbResult $result
     * @return Notam[]
     */
    public static function readNotamFromResultList(IDbResult $result): array
    {
        $notams = [];
        while ($row = $result->fetch_assoc()) {
            $notam = DbNotamConverter::fromDbRow($row);

            // filter by notam type (no KKKK)
            if ($notam->qcode == "KKKK") {
                continue;
            }

            $notams[] = $notam;
        }

        return $notams;
    }
}

<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\System\Db\Domain\Model\IDbResult;


class DbNotamResultHelper
{
    private const string QCODE_IS_CHECKLIST_NOTAM = "KKKK";

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
            if ($notam->qcode == self::QCODE_IS_CHECKLIST_NOTAM) {
                continue;
            }

            $notams[] = $notam;
        }

        return $notams;
    }
}

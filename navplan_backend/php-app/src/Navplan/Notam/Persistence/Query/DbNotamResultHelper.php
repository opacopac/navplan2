<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Query;

use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\Notam\Persistence\Model\DbTableNotam;
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
        $t = new DbTableNotam();
        $converter = new DbNotamConverter($t);
        $notams = $converter->fromDbResult($result);

        // filter by notam type (no KKKK)
        return array_filter($notams, function(Notam $notam) {
            return $notam->qcode !== self::QCODE_IS_CHECKLIST_NOTAM;
        });
    }
}

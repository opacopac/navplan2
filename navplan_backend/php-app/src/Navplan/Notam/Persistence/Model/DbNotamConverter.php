<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Model\Notam;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


/**
 * @extends DbEntityConverter<Notam>
 */
class DbNotamConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableNotam $table)
    {
    }


    /**
     * @param array $row
     * @return Notam
     */
    public function fromDbRow(array $row): Notam
    {
        $r = new DbRowNotam($this->table, $row);
        $notamMsg = json_decode($r->getNotam(), true);

        return new Notam(
            $r->getId(),
            $notamMsg["StateCode"],
            $notamMsg["StateName"],
            $notamMsg["id"],
            StringNumberHelper::parseStringOrNull($notamMsg, "entity"),
            StringNumberHelper::parseStringOrNull($notamMsg, "status"),
            StringNumberHelper::parseStringOrNull($notamMsg, "Qcode"),
            StringNumberHelper::parseStringOrNull($notamMsg, "Area"),
            StringNumberHelper::parseStringOrNull($notamMsg, "SubArea"),
            StringNumberHelper::parseStringOrNull($notamMsg, "Condition"),
            StringNumberHelper::parseStringOrNull($notamMsg, "Subject"),
            StringNumberHelper::parseStringOrNull($notamMsg, "Modifier"),
            StringNumberHelper::parseStringOrNull($notamMsg, "message"),
            $notamMsg["startdate"],
            $notamMsg["enddate"],
            $notamMsg["all"],
            $notamMsg["location"],
            $row["ad_name"] ?? $row["fir_name"] ?? $notamMsg["location"],
            boolval($notamMsg["isICAO"]),
            $notamMsg["Created"],
            $notamMsg["key"],
            $notamMsg["type"],
            DbNotamGeometryConverter::fromDbRow($row)
        );
    }
}

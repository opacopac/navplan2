<?php declare(strict_types=1);

namespace Navplan\User\Persistence\Model;

use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\User\Domain\Model\UserPoint;


class UserPointConverter {
    public static function fromDbRow(array $row): UserPoint {
        return new UserPoint(
            intval($row["id"]),
            $row["type"],
            $row["name"],
            DbPosition2dConverter::fromDbRow($row),
            $row["remark"],
            $row["supp_info"]
        );
    }
}

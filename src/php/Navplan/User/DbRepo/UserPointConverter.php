<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\User\DomainModel\UserPoint;


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

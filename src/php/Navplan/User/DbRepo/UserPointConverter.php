<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\User\DomainModel\UserPoint;


class UserPointConverter {
    public static function fromDbResult(array $rs): UserPoint {
        return new UserPoint(
            intval($rs["id"]),
            $rs["type"],
            $rs["name"],
            new Position2d($rs["longitude"], $rs["latitude"]),
            $rs["remark"],
            $rs["supp_info"]
        );
    }
}

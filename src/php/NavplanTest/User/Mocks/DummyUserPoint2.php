<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\Common\DomainModel\Position2d;
use Navplan\User\Domain\Model\UserPoint;


class DummyUserPoint2 {
    public static function create(): UserPoint {
        return new UserPoint(
            22,
            "user",
            "Schloss Rapperswil",
            new Position2d(8.81557, 47.2273),
            NULL,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 22,
            "type" => "user",
            "name" => "Schloss Rapperswil",
            "latitude" => 47.2273,
            "longitude" => 8.81557,
            "remark" => NULL,
            "supp_info" => NULL
        );
    }
}

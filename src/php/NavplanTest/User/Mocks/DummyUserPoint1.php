<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\User\DomainModel\UserPoint;


class DummyUserPoint1 {
    public static function create(): UserPoint {
        return new UserPoint(
            22,
            "user",
            "FRI Autobahnbrücke",
            new Position2d(7.15348, 46.8317),
            "melden",
            "Wieviele Bögen hat die Eisenbahnbrücke?"
        );
    }


    public static function createDbResult(): array {
        return array(
            "id" => 22,
            "type" => "user",
            "name" => "FRI Autobahnbrücke",
            "latitude" => 46.8317,
            "longitude" => 7.15348,
            "remark" => "melden",
            "supp_info" => "Wieviele Bögen hat die Eisenbahnbrücke"
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\User\Domain\UserPoint;


class RestUserPoint {
    public static function toArray(UserPoint $up): array {
        return array(
            "id" => $up->id,
            "type" => $up->type,
            "name" => $up->name,
            "latitude" => $up->position->latitude,
            "longitude" => $up->position->longitude,
            "remark" => $up->remark,
            "supp_info" => $up->supp_info
        );
    }
}

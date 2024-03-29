<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

use Navplan\User\Domain\Model\UserPoint;


class UserPointConverter {
    public static function toRest(UserPoint $up): array {
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


    /**
     * @param UserPoint[] $userPointList
     * @return array
     */
    public static function toRestList(array $userPointList): array {
        return array_map(
            function ($up) { return self::toRest($up); },
            $userPointList
        );
    }
}

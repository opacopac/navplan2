<?php declare(strict_types=1);

namespace Navplan\Common\Rest\Converter;

use Navplan\Common\Domain\Model\Angle;


class RestAngleConverter {
    public static function toRest(?Angle $angle): ?array {
        if (!$angle) {
            return NULL;
        }

        return [
            $angle->value,
            $angle->unit->value
        ];
    }


    public static function fromRest(?array $args): ?Angle {
        if (!$args) {
            return NULL;
        }

        return new Angle(
            $args[0],
            $args[1]
        );
    }
}

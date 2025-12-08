<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Rest\Model;

use Navplan\MetarTaf\Domain\Model\MetarTafResponse;


class RestMetarTafResponseConverter {
    public static function toRest(MetarTafResponse $response): array {
        return $response->data;
    }
}

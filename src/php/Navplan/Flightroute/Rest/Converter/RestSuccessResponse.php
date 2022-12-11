<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;


class RestSuccessResponse {
    public static function toRest(bool $success): array  {
        return array(
            "success" => $success ? 1 : 0
        );
    }
}

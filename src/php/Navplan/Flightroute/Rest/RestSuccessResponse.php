<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;


class RestSuccessResponse {
    public static function toRest(): array  {
        return array(
            "success" => 1
        );
    }
}

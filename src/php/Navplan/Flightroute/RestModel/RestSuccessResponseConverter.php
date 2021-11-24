<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;


class RestSuccessResponseConverter {
    public static function toRest(): array  {
        return array(
            "success" => 1
        );
    }
}

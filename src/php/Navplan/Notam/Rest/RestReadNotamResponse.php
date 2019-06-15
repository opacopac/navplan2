<?php declare(strict_types=1);

namespace Navplan\Notam\Rest;

use Navplan\Notam\Domain\Notam;
use Navplan\Notam\Domain\ReadNotamResponse;


class RestReadNotamResponse {
    public static function toRest(ReadNotamResponse $response): array {
        return array(
            'notams' => array_map(function (Notam $notam) { return RestNotam::toRest($notam); }, $response->notams)
        );
    }
}

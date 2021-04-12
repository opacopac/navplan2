<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;

use Navplan\Notam\Domain\Notam;
use Navplan\Notam\Domain\ReadNotamResponse;


class ReadNotamResponseConverter {
    public static function toRest(ReadNotamResponse $response): array {
        return array(
            'notams' => array_map(function (Notam $notam) { return NotamConverter::toRest($notam); }, $response->notams)
        );
    }
}

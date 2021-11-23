<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;

use Navplan\Notam\DomainModel\Notam;
use Navplan\Notam\UseCase\SearchNotam\ReadNotamResponse;


class ReadNotamResponseConverter {
    public static function toRest(ReadNotamResponse $response): array {
        return array(
            'notams' => array_map(function (Notam $notam) { return RestNotamConverter::toRest($notam); }, $response->notams)
        );
    }
}

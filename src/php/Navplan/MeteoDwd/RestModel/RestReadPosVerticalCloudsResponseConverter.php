<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\MeteoDwd\DomainService\ReadPosVerticalCloudsResponse;


class RestReadPosVerticalCloudsResponseConverter {
    public static function toRest(ReadPosVerticalCloudsResponse $response): array {
        return RestVerticalCloudColumnConverter::toRestList($response->verticalCloudColumns);
    }
}

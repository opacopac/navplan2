<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Service;

use Navplan\MeteoDwd\Domain\Service\ReadPosVerticalCloudsResponse;
use Navplan\MeteoDwd\Rest\Model\RestVerticalCloudColumnConverter;


class RestReadPosVerticalCloudsResponseConverter {
    public static function toRest(ReadPosVerticalCloudsResponse $response): array {
        return RestVerticalCloudColumnConverter::toRestList($response->verticalCloudColumns);
    }
}

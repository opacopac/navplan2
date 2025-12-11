<?php declare(strict_types=1);

namespace Navplan\MetarTaf\Rest\Model;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\MetarTaf\Domain\Service\ReadMetarTafRequest;


class RestReadMetarTafRequestConverter {
    public static function fromRest(array $args): ReadMetarTafRequest {
        if (!isset($args["bbox"])) {
            throw new InvalidArgumentException("Missing bbox parameter");
        }

        $bboxStr = $args["bbox"];
        $bboxParts = explode(',', $bboxStr);

        if (count($bboxParts) !== 4) {
            throw new InvalidArgumentException("Invalid bbox format. Expected: minLon,minLat,maxLon,maxLat");
        }

        $extent = Extent2d::createFromCoords(
            (float)$bboxParts[0],
            (float)$bboxParts[1],
            (float)$bboxParts[2],
            (float)$bboxParts[3]
        );

        return new ReadMetarTafRequest($extent);
    }
}

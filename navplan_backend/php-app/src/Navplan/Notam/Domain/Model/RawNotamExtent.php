<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Model;

use Navplan\Common\Domain\Model\MultiRing2d;
use Navplan\Common\Domain\Model\Position2d;


class RawNotamExtent
{
    /**
     * @param string $type
     * @param MultiRing2d|null $firPolygon
     * @param Position2d|null $adPosition
     */
    public function __construct(
        public readonly string $type, // type, either 'fir' or 'ad'
        public ?MultiRing2d $firPolygon,
        public ?Position2d $adPosition,
    )
    {
    }
}

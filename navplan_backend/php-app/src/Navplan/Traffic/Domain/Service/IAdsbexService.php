<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;


interface IAdsbexService {
    public function readTraffic(Position2d $position, Length $radius): array;
}

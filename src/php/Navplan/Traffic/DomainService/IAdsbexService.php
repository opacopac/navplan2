<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainService;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Position2d;


interface IAdsbexService {
    public function readTraffic(Position2d $position, Length $radius): array;
}

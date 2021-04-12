<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTraffic;

use Navplan\Traffic\DomainModel\TrafficAdsbexReadRequest;


interface IReadAdsbexTrafficUc {
    function read(TrafficAdsbexReadRequest $request): array;
}

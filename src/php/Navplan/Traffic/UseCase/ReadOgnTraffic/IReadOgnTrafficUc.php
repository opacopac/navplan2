<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadOgnTraffic;

use Navplan\Traffic\DomainModel\TrafficOgnReadRequest;


interface IReadOgnTrafficUc {
    public function read(TrafficOgnReadRequest $request): array;
}

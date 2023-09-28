<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadOgnTraffic;


interface IReadOgnTrafficUc {
    public function read(TrafficOgnReadRequest $request): array;
}

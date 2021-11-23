<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails;

use Navplan\Traffic\UseCase\ReadAdsbexTraffic\TrafficAdsbexReadRequest;


interface IReadAdsbexTrafficWithDetailsUc {
    public function read(TrafficAdsbexReadRequest $request): array;
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTraffic;


interface IReadAdsbexTrafficUc {
    function read(TrafficAdsbexReadRequest $request): array;
}

<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadTrafficDetails;


interface IReadTrafficDetailsUc {
    public function readDetails(TrafficDetailsReadRequest $request): array;
}

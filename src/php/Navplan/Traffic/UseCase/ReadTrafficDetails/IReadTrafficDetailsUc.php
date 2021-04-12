<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadTrafficDetails;

use Navplan\Traffic\DomainModel\TrafficDetailsReadRequest;


interface IReadTrafficDetailsUc {
    public function readDetails(TrafficDetailsReadRequest $request): array;
}

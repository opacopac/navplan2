<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\Traffic\Domain\ReadTrafficRequest;


class ReadTrafficDetails {
    public function __construct(ITrafficConfig $config) {
    }


    public function read(ReadTrafficRequest $request): array {
    }
}

<?php declare(strict_types=1);

namespace Navplan\VerticalMap\UseCase\ReadVerticalMap;


interface IReadVerticalMapUc {
    public function read(ReadVerticalMapRequest $request): ReadVerticalMapResponse;
}

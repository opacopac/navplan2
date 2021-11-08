<?php declare(strict_types=1);

namespace Navplan\VerticalMap\UseCase\ReadVerticalMap;

use Navplan\VerticalMap\DomainService\IVerticalMapService;


class ReadVerticalMapUc implements IReadVerticalMapUc {
    public function __construct(private IVerticalMapService $verticalMapService) {
    }


    public function read(ReadVerticalMapRequest $request): ReadVerticalMapResponse {
        $verticalMap = $this->verticalMapService->buildFromWpList($request->wpPositions);

        return new ReadVerticalMapResponse($verticalMap);
    }
}

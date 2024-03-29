<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTraffic;

use Navplan\Common\GeoHelper;
use Navplan\Traffic\Domain\Service\IAdsbexService;


class ReadAdsbexTrafficUc implements IReadAdsbexTrafficUc {
    public function __construct(private IAdsbexService $adsbexRepo) {
    }


    public function read(TrafficAdsbexReadRequest $request): array {
        $midPos = $request->extent->calcMidPos();
        $dist = GeoHelper::calcHaversineDistance($request->extent->minPos, $midPos);

        return $this->adsbexRepo->readTraffic($midPos, $dist);
    }
}

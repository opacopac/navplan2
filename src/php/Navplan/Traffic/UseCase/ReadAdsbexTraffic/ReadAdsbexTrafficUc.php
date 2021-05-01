<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTraffic;

use Navplan\Shared\GeoHelper;
use Navplan\Traffic\DomainModel\TrafficAdsbexReadRequest;
use Navplan\Traffic\DomainService\IAdsbexService;


class ReadAdsbexTrafficUc implements IReadAdsbexTrafficUc {
    public function __construct(private IAdsbexService $adsbexRepo) {
    }


    public function read(TrafficAdsbexReadRequest $request): array {
        $midPos = $request->extent->calcMidPos();
        $dist = GeoHelper::calcHaversineDistance($request->extent->minPos, $midPos);

        return $this->adsbexRepo->readTraffic($midPos, $dist);
    }
}

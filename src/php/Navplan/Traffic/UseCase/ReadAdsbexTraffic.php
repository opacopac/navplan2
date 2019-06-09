<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\Shared\GeoHelper;
use Navplan\Traffic\Domain\ReadTrafficRequest;


class ReadAdsbexTraffic {
    private $adsbGateway;


    public function __construct(ITrafficConfig $config) {
        $this->adsbGateway = $config->getAdsbexGateway();
    }


    public function read(ReadTrafficRequest $request): array {
        $midPos = $request->extent->calcMidPos();
        $dist = GeoHelper::calcHaversineDistance($request->extent->minPos, $midPos);

        return $this->adsbGateway->readTraffic($midPos, $dist);
    }
}

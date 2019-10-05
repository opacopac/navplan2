<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAdsbexReadRequest;
use Navplan\Traffic\Domain\TrafficAdsbexWithDetail;
use Navplan\Traffic\Domain\TrafficDetail;
use Navplan\Traffic\Domain\TrafficDetailsReadRequest;


class ReadAdsbexTrafficWithDetails {
    private $adsbTrafficReader;
    private $trafficDetailsReader;


    public function __construct(ITrafficConfig $config) {
        $this->adsbTrafficReader = new ReadAdsbexTraffic($config);
        $this->trafficDetailsReader = new ReadTrafficDetails($config);
    }


    public function read(TrafficAdsbexReadRequest $request): array {
        $adsbTrafficList = $this->adsbTrafficReader->read($request);
        $readTrafficDetailsRequest = $this->getTrafficDetailsReadRequest($adsbTrafficList);
        $trafficDetails = $this->trafficDetailsReader->readDetails($readTrafficDetailsRequest);

        return $this->createResponse($adsbTrafficList, $trafficDetails);
    }


    private function getTrafficDetailsReadRequest(array $adsbTrafficList): TrafficDetailsReadRequest {
        return new TrafficDetailsReadRequest(
            array_map(
                function (TrafficAdsbex $ac) {
                    return new TrafficDetail(
                        $ac->address,
                        $ac->registration,
                        NULL,
                        NULL,
                        $ac->icaoType,
                        NULL,
                        NULL
                    );
                },
                $adsbTrafficList
            )
        );
    }


    private function createResponse(array $adsbTraffic, array $trafficDetails): array {
        $detailsLut = [];
        array_walk(
            $trafficDetails,
            function (TrafficDetail $detail) use (&$detailsLut) {
                $detailsLut[$detail->address->value] = $detail;
            }
        );

        return array_map(
            function (TrafficAdsbex $ac) use ($detailsLut) {
                /* @var $details TrafficDetail */
                $details = isset($detailsLut[$ac->address->value]) ? $detailsLut[$ac->address->value] : NULL;

                return new TrafficAdsbexWithDetail(
                    $ac,
                    $details ? $details->acClass : NULL,
                    $details ? $details->engClass : NULL
                );
            },
            $adsbTraffic
        );
    }
}

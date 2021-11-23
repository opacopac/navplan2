<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails;

use Navplan\Traffic\DomainModel\TrafficAdsbex;
use Navplan\Traffic\DomainModel\TrafficAdsbexWithDetail;
use Navplan\Traffic\DomainModel\TrafficDetail;
use Navplan\Traffic\DomainModel\TrafficDetailsReadRequest;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\TrafficAdsbexReadRequest;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;


class ReadAdsbexTrafficWithDetailsUc implements IReadAdsbexTrafficWithDetailsUc {
    public function __construct(
        private IReadAdsbexTrafficUc $readAdsbTrafficUc,
        private IReadTrafficDetailsUc $readTrafficDetailsUc
    ) {
    }


    /**
     * @param TrafficAdsbexReadRequest $request
     * @return TrafficAdsbexWithDetail[]
     */
    public function read(TrafficAdsbexReadRequest $request): array {
        $adsbTrafficList = $this->readAdsbTrafficUc->read($request);
        $readTrafficDetailsRequest = $this->getTrafficDetailsReadRequest($adsbTrafficList);
        $trafficDetails = $this->readTrafficDetailsUc->readDetails($readTrafficDetailsRequest);

        return $this->createResponse($adsbTrafficList, $trafficDetails);
    }


    /**
     * @param array $adsbTrafficList
     * @return TrafficDetailsReadRequest
     */
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


    /**
     * @param array $adsbTraffic
     * @param array $trafficDetails
     * @return TrafficAdsbexWithDetail[]
     */
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

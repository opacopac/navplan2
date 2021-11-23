<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadTrafficDetails;

use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;
use Navplan\Traffic\DomainService\ITrafficDetailRepo;


class ReadTrafficDetailsUc implements IReadTrafficDetailsUc {
    public function __construct(private ITrafficDetailRepo $trafficDetailRepo) {
    }


    public function readDetails(TrafficDetailsReadRequest $request): array {
        $trafficDetailList = $request->trafficDetailList;

        $icao24List = $this->getIcao24List($trafficDetailList);

        $lfrchDetailList = $this->trafficDetailRepo->readDetailsFromLfrCh($icao24List);
        $this->mergeLfrchDetails($trafficDetailList, $lfrchDetailList);

        $basestationDetailList = $this->trafficDetailRepo->readDetailsFromBasestation($icao24List);
        $this->mergeBasestationDetails($trafficDetailList, $basestationDetailList);

        $acTypeList = $this->getAcTypeList($trafficDetailList);

        $icaoAcTypeDetailList = $this->trafficDetailRepo->readDetailsFromIcaoAcTypes($acTypeList);
        $this->mergeIcaoAcTypeDetails($trafficDetailList, $icaoAcTypeDetailList);

        return $trafficDetailList;
    }


    private function getIcao24List(array $trafficDetailList): array {
        $icaoOnlyList = array_filter(
            $trafficDetailList,
            function ($ac) {
                return ($ac->address && $ac->address->type === TrafficAddressType::ICAO);
            });

        return array_map(
            function (TrafficDetail $trafficDetail) { return $trafficDetail->address->value; },
            $icaoOnlyList
        );
    }


    private function getAcTypeList(array $trafficDetailList): array {
        $acTypeList = array_map(
            function (TrafficDetail $trafficDetail) { return $trafficDetail->icaoAcType; },
            $trafficDetailList
        );

        $acTypeList = array_filter($acTypeList);

        return array_unique($acTypeList);
    }


    private function mergeLfrchDetails(array &$trafficDetailList, array $lfrchDetailsList) {
        $icao24Map = $this->getIcao24Map($lfrchDetailsList);

        /* @var $trafficDetail TrafficDetail */
        foreach ($trafficDetailList as &$trafficDetail) {
            if (!isset($trafficDetail->address) || !isset($icao24Map[$trafficDetail->address->value])) {
                continue;
            }
            /* @var $lfrchDetail TrafficDetail */
            $lfrchDetail = $icao24Map[$trafficDetail->address->value];

            $trafficDetail->registration = $lfrchDetail->registration;
            $trafficDetail->model = $lfrchDetail->model;
            $trafficDetail->manufacturer = $lfrchDetail->manufacturer;
        }
    }


    private function mergeBasestationDetails(array &$trafficDetailList, array $basestationDetailList) {
        $icao24Map = $this->getIcao24Map($basestationDetailList);

        /* @var $trafficDetail TrafficDetail */
        foreach ($trafficDetailList as &$trafficDetail) {
            if (!isset($trafficDetail->address) || !isset($icao24Map[$trafficDetail->address->value])) {
                continue;
            }
            /* @var $basestationDetail TrafficDetail */
            $basestationDetail = $icao24Map[$trafficDetail->address->value];

            if (!$trafficDetail->registration) {
                $trafficDetail->registration = $basestationDetail->registration;
            }
            if (!$trafficDetail->manufacturer) {
                $trafficDetail->manufacturer = $basestationDetail->manufacturer;
            }
            $trafficDetail->icaoAcType = $basestationDetail->icaoAcType;

        }
    }


    private function mergeIcaoAcTypeDetails(array &$trafficDetailList, array $icaoAcTypeDetailList) {
        $icaoAcTypeMap = $this->getIcaoAcTypeMap($icaoAcTypeDetailList);

        /* @var $trafficDetail TrafficDetail */
        foreach ($trafficDetailList as &$trafficDetail) {
            if (!isset($icaoAcTypeMap[$trafficDetail->icaoAcType])) {
                continue;
            }
            /* @var $icaoAcType TrafficDetail */
            $icaoAcType = $icaoAcTypeMap[$trafficDetail->icaoAcType];

            if (!$trafficDetail->model) {
                $trafficDetail->model = $icaoAcType->model;
            }
            if (!$trafficDetail->manufacturer) {
                $trafficDetail->manufacturer = $icaoAcType->manufacturer;
            }
            $trafficDetail->acClass = $icaoAcType->acClass;
            $trafficDetail->engClass = $icaoAcType->engClass;
        }
    }


    private function getIcao24Map(array $trafficDetailList): array {
        $trafficMap = array();

        /* @var $trafficDetail TrafficDetail */
        foreach ($trafficDetailList as $trafficDetail) {
            $trafficMap[$trafficDetail->address->value] = $trafficDetail;
        }

        return $trafficMap;
    }


    private function getIcaoAcTypeMap(array $trafficDetailList): array {
        $trafficMap = array();

        /* @var $trafficDetail TrafficDetail */
        foreach ($trafficDetailList as $trafficDetail) {
            if (!isset($trafficMap[$trafficDetail->icaoAcType])) {
                $trafficMap[$trafficDetail->icaoAcType] = $trafficDetail;
            } else {
                /* @var $existingEntry TrafficDetail */
                $existingEntry = $trafficMap[$trafficDetail->icaoAcType];

                // remove model in case of multiple different entries
                if ($existingEntry->model !== $trafficDetail->model) {
                    $existingEntry->model = NULL;
                }

                // remove manufacturer in case of multiple different entries
                if ($existingEntry->manufacturer !== $trafficDetail->manufacturer) {
                    $existingEntry->manufacturer = NULL;
                }
            }
        }

        return $trafficMap;
    }
}

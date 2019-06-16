<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\Traffic\Domain\TrafficDetailsReadRequest;
use Navplan\Traffic\Domain\TrafficDetail;


class ReadTrafficDetails {
    private $trafficRepo;


    public function __construct(ITrafficConfig $config) {
        $this->trafficRepo = $config->getTrafficRepo();
    }


    public function readDetails(TrafficDetailsReadRequest $request): array {
        $trafficDetailList = $request->trafficDetailList;

        $icao24List = $this->getIcao24List($trafficDetailList);

        $lfrchDetailList = $this->trafficRepo->readDetailsFromLfrCh($icao24List);
        $this->mergeLfrchDetails($trafficDetailList, $lfrchDetailList);

        $basestationDetailList = $this->trafficRepo->readDetailsFromBasestation($icao24List);
        $this->mergeBasestationDetails($trafficDetailList, $basestationDetailList);

        $acTypeList = $this->getAcTypeList($trafficDetailList);

        $icaoAcTypeDetailList = $this->trafficRepo->readDetailsFromIcaoAcTypes($acTypeList);
        $this->mergeIcaoAcTypeDetails($trafficDetailList, $icaoAcTypeDetailList);

        return $trafficDetailList;
    }


    private function getIcao24List(array $trafficDetailList): array {
        $icao24List = array_map(
            function (TrafficDetail $trafficDetail) { return $trafficDetail->icao24; },
            $trafficDetailList
        );

        return array_filter($icao24List);
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
            if (!isset($icao24Map[$trafficDetail->icao24])) {
                continue;
            }
            /* @var $lfrchDetail TrafficDetail */
            $lfrchDetail = $icao24Map[$trafficDetail->icao24];

            $trafficDetail->registration = $lfrchDetail->registration;
            $trafficDetail->model = $lfrchDetail->model;
            $trafficDetail->manufacturer = $lfrchDetail->manufacturer;
        }
    }


    private function mergeBasestationDetails(array &$trafficDetailList, array $basestationDetailList) {
        $icao24Map = $this->getIcao24Map($basestationDetailList);

        /* @var $trafficDetail TrafficDetail */
        foreach ($trafficDetailList as &$trafficDetail) {
            if (!isset($icao24Map[$trafficDetail->icao24])) {
                continue;
            }
            /* @var $basestationDetail TrafficDetail */
            $basestationDetail = $icao24Map[$trafficDetail->icao24];

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
            $trafficMap[$trafficDetail->icao24] = $trafficDetail;
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

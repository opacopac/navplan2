<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadOgnTraffic;

use Navplan\Traffic\DomainModel\TrafficOgn;
use Navplan\Traffic\DomainModel\TrafficOgnReadRequest;
use Navplan\Traffic\DomainModel\TrafficPosition;
use Navplan\Traffic\DomainService\IOgnService;


class ReadOgnTrafficUc implements IReadOgnTrafficUc {
    public function __construct(private IOgnService $ognRepo) {
    }


    public function read(TrafficOgnReadRequest $request): array {
        $this->ognRepo->setFilter(
            $request->sessionId,
            $request->extent,
            $request->maxAge
        );

        $trafficList = $this->ognRepo->readTraffic($request->sessionId);
        $trafficList = $this->groupByAcAddress($trafficList);
        $this->removeDuplicatePositions($trafficList);

        return $trafficList;
    }


    private function groupByAcAddress(array $trafficList): array {
        usort(
            $trafficList,
            function (TrafficOgn $trafficA, TrafficOgn $trafficB) {
                if ($trafficA->address->value === $trafficB->address->value) {
                    return 0;
                } elseif ($trafficA->address->value > $trafficB->address->value) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );

        /* @var $currentTraffic TrafficOgn */
        $currentTraffic = NULL;
        $groupedTrafficList = [];
        /* @var $traffic TrafficOgn */
        foreach ($trafficList as $traffic) {
            if (!$currentTraffic || $currentTraffic->address->value !== $traffic->address->value) {
                $groupedTrafficList[] = $traffic;
                $currentTraffic = $traffic;
            } else {
                $currentTraffic->positionList[] = $traffic->positionList[0];
            }
        }

        return $groupedTrafficList;
    }


    private function removeDuplicatePositions(array &$trafficList) {
        /* @var $traffic TrafficOgn */
        foreach ($trafficList as &$traffic) {
            usort(
                $traffic->positionList,
                function (TrafficPosition $posA, TrafficPosition $posB) {
                    return $posA->position->timestamp->toMs() - $posB->position->timestamp->toMs();
                }
            );

            /* @var $currentPos TrafficPosition */
            $currentPos = NULL;
            $filteredPosList = [];
            /* @var $pos TrafficPosition */
            foreach ($traffic->positionList as $pos) {
                if ($currentPos && $currentPos->position->timestamp->toMs() === $pos->position->timestamp->toMs()) {
                    continue; // skip same timestamp
                } elseif ($currentPos && $currentPos->position->longitude === $pos->position->longitude
                    && $currentPos->position->latitude === $pos->position->latitude) {
                    continue; // skip same coordinates
                } else {
                    $filteredPosList[] = $pos;
                    $currentPos = $pos;
                }
            }

            $traffic->positionList = $filteredPosList;
        }
    }
}

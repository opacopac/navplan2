<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\Traffic\Domain\ReadTrafficRequest;
use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficPosition;


class ReadOgnTraffic {
    private $ognGateway;


    public function __construct(ITrafficConfig $config) {
        $this->ognGateway = $config->getOgnGateway();
    }


    public function read(ReadTrafficRequest $request): array {
        $this->ognGateway->setFilter($request->sessionId, $request->extent);

        if (!$this->ognGateway->isListenerRunning($request->sessionId)) {
            $this->ognGateway->startListener($request->sessionId);
        }

        $trafficList = $this->ognGateway->readTraffic($request->sessionId);
        $trafficList = $this->groupByAcAddress($trafficList);
        $this->removeDuplicatePositions($trafficList);

        return $trafficList;
    }


    private function groupByAcAddress(array $trafficList): array {
        usort(
            $trafficList,
            function (Traffic $trafficA, Traffic $trafficB) {
                if ($trafficA->acAddress === $trafficB->acAddress) {
                    return 0;
                } elseif ($trafficA->acAddress > $trafficB->acAddress) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );

        /* @var $currentTraffic Traffic */
        $currentTraffic = NULL;
        $groupedTrafficList = [];
        /* @var $traffic Traffic */
        foreach ($trafficList as $traffic) {
            if (!$currentTraffic || $currentTraffic->acAddress !== $traffic->acAddress) {
                $groupedTrafficList[] = $traffic;
                $currentTraffic = $traffic;
            } else {
                $currentTraffic->positionList[] = $traffic->positionList[0];
            }
        }

        return $groupedTrafficList;
    }


    private function removeDuplicatePositions(array &$trafficList) {
        /* @var $traffic Traffic */
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

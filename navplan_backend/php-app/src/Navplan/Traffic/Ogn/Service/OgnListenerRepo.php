<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\Traffic\Ogn\Model\OgnTrafficConverter;
use Navplan\Traffic\Ogn\Model\OgnTrafficFilter;
use Navplan\Traffic\Ogn\Model\OgnTrafficFilterConverter;
use Navplan\Traffic\Ogn\Model\OgnTrafficMessage;


class OgnListenerRepo implements IOgnListenerRepo {
    public function __construct(
        private IDbService $dbService,
        private ITimeService $timeService
    ) {
    }


    public  function isListenerRunning(int $sessionId): bool {
        $query = "SELECT * FROM ogn_listener WHERE sessionId=" . $sessionId;
        $result = $this->dbService->execSingleResultQuery($query, true, "error reading ogn listener status");

        if ($result->getNumRows() === 1) {
            return TRUE;
        } else {
            return FALSE;
        }
    }


    public function setListenerIsRunning(int $sessionId) {
        $query = "INSERT INTO ogn_listener (sessionId) VALUES (" . $sessionId . ")";
        $this->dbService->execCUDQuery($query, "error creating ogn listener status");
    }


    public function unsetListenerIsRunning(int $sessionId) {
        $query = "DELETE FROM ogn_listener WHERE sessionId=" .$sessionId;
        $this->dbService->execCUDQuery($query, "error removing ogn listener status");
    }


    public  function getFilter(int $sessionId): ?OgnTrafficFilter {
        $query = "SELECT * FROM ogn_filter WHERE sessionId=" . $sessionId;
        $result = $this->dbService->execSingleResultQuery($query, true, "error reading ogn filter");


        if ($result->getNumRows() !== 1) {
            return NULL;
        } else {
            $row = $result->fetch_assoc();
            return OgnTrafficFilterConverter::fromDbRow($row);
        }
    }


    public function setFilter(int $sessionId, Extent2d $extent) {
        $query  = "INSERT INTO ogn_filter (sessionId, minLon, minLat, maxLon, maxLat) ";
        $query .= "VALUES (" . $sessionId . ",";
        $query .= $extent->minPos->longitude . ",";
        $query .= $extent->minPos->latitude . ",";
        $query .= $extent->maxPos->longitude . ",";
        $query .= $extent->maxPos->latitude . ") ";
        $query .= "ON DUPLICATE KEY UPDATE ";
        $query .= "minLon=" . $extent->minPos->longitude . ",";
        $query .= "minLat=" . $extent->minPos->latitude . ",";
        $query .= "maxLon=" . $extent->maxPos->longitude . ",";
        $query .= "maxLat=" . $extent->maxPos->latitude . ",";
        $query .= "lastModified=CURRENT_TIMESTAMP()";

        $this->dbService->execCUDQuery($query, "error setting ogn filter");
    }


    public function deleteFilter(int $sessionId) {
        $query = "DELETE FROM ogn_filter WHERE sessionId=" . $sessionId;

        $this->dbService->execCUDQuery($query, "error deleting ogn filter");
    }


    public function readTraffic(int $sessionId): array {
        $query = "SELECT * FROM ogn_traffic WHERE sessionId=" . $sessionId;
        $result = $this->dbService->execMultiResultQuery($query, "error reading ogn traffic");

        $aclist = [];
        while ($row = $result->fetch_assoc()) {
            $aclist[] = OgnTrafficConverter::fromDbRow($row);
        }

        return $aclist;
    }


    public function writeTrafficMessage(int $sessionId, OgnTrafficMessage $trafficMessage) {
        $query =  "INSERT INTO ogn_traffic (sessionId,address,addressType,acType,timestampSec,longitude,latitude,altitudeMeter,receiver) ";
        $query .= "VALUES (" . $sessionId . ",";
        $query .= "'" . $this->dbService->escapeString($trafficMessage->address) . "',";
        $query .= "'" . $this->dbService->escapeString($trafficMessage->addressType) . "',";
        $query .= "'" . $this->dbService->escapeString($trafficMessage->acType) . "',";
        $query .= $trafficMessage->timestamp . ",";
        $query .= $trafficMessage->position->longitude . ",";
        $query .= $trafficMessage->position->latitude . ",";
        $query .= $trafficMessage->position->altitude->value . ",";
        $query .= "'" . $this->dbService->escapeString($trafficMessage->receiver) . "')";

        $this->dbService->execCUDQuery($query, "error writing ogn traffic message");
    }


    function cleanupTrafficMessages(int $maxAgeSec) {
        $maxAgeTimestamp = $this->timeService->currentTimestampSec() - $maxAgeSec;
        $query = "DELETE FROM ogn_traffic WHERE timestampSec<" . $maxAgeTimestamp;

        $this->dbService->execCUDQuery($query, "error deleting ogn traffic");
    }
}

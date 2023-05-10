<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerService;

use InvalidArgumentException;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\OgnListenerModel\OgnTrafficFilter;
use Navplan\Traffic\OgnListenerModel\OgnTrafficMessageConverter;
use RuntimeException;


class OgnListener implements IOgnListener {
    private const OGN_HOSTS = ['glidern1.glidernet.org', 'glidern2.glidernet.org', 'glidern3.glidernet.org', 'glidern4.glidernet.org', 'glidern5.glidernet.org']; // TODO: config
    private const OGN_PORT = 14580;
    private const OGN_USER = 'NAVPLN02';
    private const OGN_SOFTWARE = 'navplan.ch';
    private const OGN_SW_VERSION = '2.0';
    private const OGN_FILTER_TIMEOUT_SEC = 30;
    private const OGN_FILTER_UPDATE_INTERVAL_SEC = 1;
    private const OGN_TRAFFIC_CLEANUP_SEC = 15;


    public function __construct(
        private readonly IOgnListenerRepo $ognListenerRepo,
        private readonly ITimeService $timeService,
        private readonly ILoggingService $logger
    ) {
    }


    public function start(int $sessionId, int $maxAgeSec) {
        if (!$sessionId || !is_numeric($sessionId)) {
            $message = "invalid or missing ogn sessionId";
            $this->logger->error($message);
            throw new InvalidArgumentException($message);
        }

        $this->logger->info("starting ogn listener for session " . $sessionId);
        $this->ognListenerRepo->setListenerIsRunning($sessionId);

        try {
            $initialFilter = $this->ognListenerRepo->getFilter($sessionId);
            if (!$initialFilter) {
                $message = "no filter found for sessionId " . $sessionId;
                $this->logger->error($message);
                throw new InvalidArgumentException($message);
            }

            $connection = $this->connect($initialFilter);
            $this->readOgnMessages($connection, $sessionId, $initialFilter, $maxAgeSec);
            $this->disconnect($connection);
        } finally {
            $this->logger->info("closing ogn listener for session " . $sessionId);
            $this->ognListenerRepo->unsetListenerIsRunning($sessionId);
            $this->ognListenerRepo->deleteFilter($sessionId);
        }
    }


    private function connect(OgnTrafficFilter $initialFilter) {
        // telnet aprs.glidernet.org 14580
        $host = self::OGN_HOSTS[rand(0, count(self::OGN_HOSTS) - 1)];
        $this->logger->debug("connecting to ogn host " . $host);
        $fp = fsockopen($host, self::OGN_PORT, $errno, $errstr, 30);
        if (!$fp)  {
            $message = "unable to connect to ogn: $errstr ($errno)";
            $this->logger->error($message);
            throw new RuntimeException($message);
        }
        stream_set_blocking($fp, true);

        // login
        // user NAVPLNCH1 pass -1 vers navplan.ch 1.0 filter a/47.78917089079263/8.11271667480469/46.590956573124544/10.231704711914062 r/46.80/8.23/250
        $loginStr = "user " . self::OGN_USER;
        $loginStr .= " pass -1";
        $loginStr .= " vers " . self::OGN_SOFTWARE . " " . self::OGN_SW_VERSION;
        $loginStr .= " filter " . $this->getFilterString($initialFilter) . "\r\n";
        $this->logger->debug("login for ogn host: " . trim($loginStr));
        fwrite($fp, $loginStr);

        return $fp;
    }


    private function disconnect($fp) {
        $this->logger->debug("disconnecting from ogn host");
        stream_socket_shutdown($fp, STREAM_SHUT_RDWR);
        fclose($fp);

        unset($fp);
    }


    private function readOgnMessages($connection, int $sessionId, OgnTrafficFilter $currentFilter, int $maxAgeSec) {
        $lastFilterUpdate = $this->timeService->currentTimestampSec();
        $lastTrafficCleanup = 0;

        while (!feof($connection)) {
            // read ogn message
            $line = fgets($connection);
            $this->logger->debug("ogn message for session " . $sessionId . ": " . trim($line));

            if (substr($line, 0, 1) != "#") {
                preg_match('/' . OgnTrafficMessageConverter::PATTERN_APRS . '/', $line, $matches);

                if (isset($matches["comment"]) &&
                    preg_match('/' . OgnTrafficMessageConverter::PATTERN_AIRCRAFT . '/', $matches["comment"], $matches2)
                ) {
                    $ognMsg = OgnTrafficMessageConverter::fromAprsMessage($matches, $matches2);
                    $this->ognListenerRepo->writeTrafficMessage($sessionId, $ognMsg);
                }
            }

            // cleanup old traffic
            if ($this->timeService->currentTimestampSec() > $lastTrafficCleanup + self::OGN_TRAFFIC_CLEANUP_SEC) {
                $this->logger->debug("cleaning up expired ogn traffic");
                $this->ognListenerRepo->cleanupTrafficMessages($maxAgeSec);
                $lastTrafficCleanup = $this->timeService->currentTimestampSec();
            }

            // update filter
            if ($this->timeService->currentTimestampSec() > $lastFilterUpdate + self::OGN_FILTER_UPDATE_INTERVAL_SEC) {
                $lastFilterUpdate = $this->timeService->currentTimestampSec();
                $newFilter = $this->ognListenerRepo->getFilter($sessionId);

                if (!$newFilter || !$newFilter->timestamp // no filter found
                    || $this->timeService->currentTimestampSec() > $newFilter->timestamp + self::OGN_FILTER_TIMEOUT_SEC) { // filter timed out
                    $this->logger->debug("ogn filter timed out for session " . $sessionId);
                    break;
                }

                if (!$newFilter->equals($currentFilter)) { // filter changed => send new filter
                    $filterString = "#filter " . $this->getFilterString($newFilter) . "\r\n";
                    $this->logger->debug("updating ogn filter for session " . $sessionId . ": " . trim($filterString));
                    fputs($connection, $filterString);
                    $currentFilter = $newFilter;
                }
            }
        }
    }


    private function getFilterString(OgnTrafficFilter $ognTrafficFilter): string {
        $extent = $ognTrafficFilter->extent;
        return "a/" . $extent->maxPos->latitude . "/" . $extent->minPos->longitude
            . "/" . $extent->minPos->latitude . "/" . $extent->maxPos->longitude;
    }
}

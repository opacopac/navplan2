<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\TimeUnit;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IProcService;
use Navplan\Traffic\DomainService\IOgnService;
use Navplan\Traffic\OgnListenerService\IOgnListenerRepo;


class OgnService implements IOgnService {
    // TODO: inject
    private const OGN_LISTENER_PATH = "../OgnListenerService/";
    private const OGN_LISTENER_STARTER = "OgnListenerStarter.php";


    public function __construct(
        private IOgnListenerRepo $ognListenerRepo,
        private IProcService $procService,
        private ILoggingService $logger
    ) {
    }


    public function setFilter(int $sessionId, Extent2d $extent, Time $maxAge) {
        $this->ognListenerRepo->setFilter($sessionId, $extent);

        if (!$this->ognListenerRepo->isListenerRunning($sessionId)) {
            $this->startListener($sessionId, $maxAge);
        } else {
            $this->logger->debug("ogn listener already running for session " . $sessionId);
        }
    }


    public function readTraffic(int $sessionId): array {
        return $this->ognListenerRepo->readTraffic($sessionId);
    }


    private function startListener(int $sessionId, Time $maxAge) {
        $this->procService->startBackgroundProcess(
            "php -q " . self::OGN_LISTENER_PATH . self::OGN_LISTENER_STARTER . " " . $sessionId . " " . $maxAge->getValue(TimeUnit::S),
            null,
            null,
            null,
            realpath(self::OGN_LISTENER_PATH),
            null,
            null
        );
    }
}

<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Config\ProdConfigDiContainer;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\Traffic\Adsbex\Service\AdsbexService;
use Navplan\Traffic\Adsbex\Service\IAdsbexConfig;
use Navplan\Traffic\Domain\Service\IAdsbexService;
use Navplan\Traffic\Domain\Service\IOgnService;
use Navplan\Traffic\Domain\Service\ITrafficDetailRepo;
use Navplan\Traffic\Ogn\Service\IOgnListenerRepo;
use Navplan\Traffic\Ogn\Service\OgnListenerRepo;
use Navplan\Traffic\Ogn\Service\OgnService;
use Navplan\Traffic\TrafficDetail\Service\DbTrafficDetailRepo;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\ReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\ReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\ReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\ReadTrafficDetailsUc;


class ProdTrafficDiContainer implements ITrafficDiContainer {
    private const OGN_LISTENER_STARTER_PATH = __DIR__; // TODO: config
    private const OGN_LISTENER_STARTER_FILE = "OgnListenerStarter.php"; // TODO: config

    private IAdsbexConfig $adsbexConfig;
    private IAdsbexService $adsbexRepo;
    private IOgnService $ognRepo;
    private IOgnListenerRepo $ognListenerRepo;
    private ITrafficDetailRepo $trafficDetailsRepo;
    private IReadAdsbexTrafficUc $readAdsbexTrafficUc;
    private IReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetailsUc;
    private IReadOgnTrafficUc $readOgnTrafficUc;
    private IReadTrafficDetailsUc $readTrafficDetailsUc;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly ITimeService $timeService,
        private readonly IProcService $procService,
        private readonly ILoggingService $loggingService,
        private readonly IDbService $dbService
    ) {
    }


    public function getAdsbexConfig(): IAdsbexConfig {
        if (!isset($this->adsbexConfig)) {
            $this->adsbexConfig = new ProdConfigDiContainer();
        }

        return $this->adsbexConfig;
    }


    public function getAdsbexRepo(): IAdsbexService {
        if (!isset($this->adsbexRepo)) {
            $this->adsbexRepo = new AdsbexService(
                $this->fileService,
                $this->timeService,
                $this->getAdsbexConfig()
            );
        }

        return $this->adsbexRepo;
    }


    public function getOgnRepo(): IOgnService {
        if (!isset($this->ognRepo)) {
            $this->ognRepo = new OgnService(
                $this->getOgnListenerRepo(),
                $this->procService,
                $this->loggingService,
                self::OGN_LISTENER_STARTER_PATH,
                self::OGN_LISTENER_STARTER_FILE
            );
        }

        return $this->ognRepo;
    }


    public function getOgnListenerRepo(): IOgnListenerRepo {
        if (!isset($this->ognListenerRepo)) {
            $this->ognListenerRepo = new OgnListenerRepo(
                $this->dbService,
                $this->timeService
            );
        }

        return $this->ognListenerRepo;
    }


    public function getTrafficDetailRepo(): ITrafficDetailRepo {
        if (!isset($this->trafficDetailsRepo)) {
            $this->trafficDetailsRepo = new DbTrafficDetailRepo($this->dbService);
        }

        return $this->trafficDetailsRepo;
    }



    public function getReadAdsbexTrafficUc(): IReadAdsbexTrafficUc {
        if (!isset($this->readAdsbexTrafficUc)) {
            $this->readAdsbexTrafficUc = new ReadAdsbexTrafficUc($this->getAdsbexRepo());
        }

        return $this->readAdsbexTrafficUc;
    }


    public function getReadAdsbexTrafficWithDetailsUc(): IReadAdsbexTrafficWithDetailsUc {
        if (!isset($this->readAdsbexTrafficWithDetailsUc)) {
            $this->readAdsbexTrafficWithDetailsUc = new ReadAdsbexTrafficWithDetailsUc(
                $this->getReadAdsbexTrafficUc(),
                $this->getReadTrafficDetailsUc()
            );
        }

        return $this->readAdsbexTrafficWithDetailsUc;
    }


    public function getReadOgnTrafficUc(): IReadOgnTrafficUc {
        if (!isset($this->readOgnTrafficUc)) {
            $this->readOgnTrafficUc = new ReadOgnTrafficUc($this->getOgnRepo());
        }

        return $this->readOgnTrafficUc;
    }


    public function getReadTrafficDetailsUc(): IReadTrafficDetailsUc {
        if (!isset($this->readTrafficDetailsUc)) {
            $this->readTrafficDetailsUc = new ReadTrafficDetailsUc($this->getTrafficDetailRepo());
        }

        return $this->readTrafficDetailsUc;
    }
}

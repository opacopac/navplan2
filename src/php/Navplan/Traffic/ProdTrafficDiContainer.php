<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ITimeService;
use Navplan\Traffic\AdsbexService\AdsbexService;
use Navplan\Traffic\AdsbexService\IAdsbexConfigService;
use Navplan\Traffic\DomainService\IAdsbexService;
use Navplan\Traffic\DomainService\IOgnService;
use Navplan\Traffic\DomainService\ITrafficDetailRepo;
use Navplan\Traffic\OgnListenerService\IOgnListenerRepo;
use Navplan\Traffic\OgnListenerService\OgnListenerRepo;
use Navplan\Traffic\OgnService\OgnService;
use Navplan\Traffic\TrafficDetailRepo\DbTrafficDetailRepo;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\ReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\ReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\ReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\ReadTrafficDetailsUc;


class ProdTrafficDiContainer implements ITrafficDiContainer {
    private IAdsbexConfigService $adsbexConfigService;
    private IAdsbexService $adsbexRepo;
    private IOgnService $ognRepo;
    private IOgnListenerRepo $ognListenerRepo;
    private ITrafficDetailRepo $trafficDetailsRepo;
    private IReadAdsbexTrafficUc $readAdsbexTrafficUc;
    private IReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetailsUc;
    private IReadOgnTrafficUc $readOgnTrafficUc;
    private IReadTrafficDetailsUc $readTrafficDetailsUc;


    public function __construct(
        private IFileService $fileService,
        private ITimeService $timeService,
        private IProcService $procService,
        private ILoggingService $loggingService,
        private IDbService $dbService
    ) {
    }


    public function getAdsbexRepo(): IAdsbexService {
        if (!isset($this->adsbexRepo)) {
            $this->adsbexRepo = new AdsbexService(
                $this->fileService,
                $this->timeService
            );
        }

        return $this->adsbexRepo;
    }


    public function getOgnRepo(): IOgnService {
        if (!isset($this->ognRepo)) {
            $this->ognRepo = new OgnService(
                $this->getOgnListenerRepo(),
                $this->procService,
                $this->loggingService
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

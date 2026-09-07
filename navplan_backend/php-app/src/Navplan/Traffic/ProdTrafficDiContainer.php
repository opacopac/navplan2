<?php declare(strict_types=1);

namespace Navplan\Traffic;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
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
use Navplan\Traffic\Rest\Service\TrafficController;
use Navplan\Traffic\TrafficDetail\Service\DbTrafficDetailRepo;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\ReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\ReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\ReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\ReadTrafficDetailsUc;
use function DI\autowire;
use function DI\factory;


class ProdTrafficDiContainer implements ITrafficDiContainer
{
    private const OGN_LISTENER_STARTER_PATH = __DIR__; // TODO: config
    private const OGN_LISTENER_STARTER_FILE = "OgnListenerStarter.php"; // TODO: config

    private Container $container;


    public function __construct(
        IFileService $fileService,
        ITimeService $timeService,
        IProcService $procService,
        ILoggingService $loggingService,
        IDbService $dbService,
        IHttpService $httpService,
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IFileService::class => $fileService,
            ITimeService::class => $timeService,
            IProcService::class => $procService,
            ILoggingService::class => $loggingService,
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings
            IAdsbexConfig::class => autowire(ProdConfigDiContainer::class),
            IAdsbexService::class => autowire(AdsbexService::class),
            IOgnListenerRepo::class => autowire(OgnListenerRepo::class),
            ITrafficDetailRepo::class => autowire(DbTrafficDetailRepo::class),
            IReadAdsbexTrafficUc::class => autowire(ReadAdsbexTrafficUc::class),
            IReadAdsbexTrafficWithDetailsUc::class => autowire(ReadAdsbexTrafficWithDetailsUc::class),
            IReadOgnTrafficUc::class => autowire(ReadOgnTrafficUc::class),
            IReadTrafficDetailsUc::class => autowire(ReadTrafficDetailsUc::class),
            IRestController::class => autowire(TrafficController::class),

            // OgnService needs the listener starter path/file consts, so it can't be
            // wired via plain autowiring alone.
            IOgnService::class => factory(function (
                IOgnListenerRepo $ognListenerRepo,
                IProcService $procService,
                ILoggingService $loggingService
            ) {
                return new OgnService(
                    $ognListenerRepo,
                    $procService,
                    $loggingService,
                    self::OGN_LISTENER_STARTER_PATH,
                    self::OGN_LISTENER_STARTER_FILE
                );
            }),
        ]);

        $this->container = $builder->build();
    }


    public function getTrafficController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getAdsbexConfig(): IAdsbexConfig
    {
        return $this->container->get(IAdsbexConfig::class);
    }


    public function getAdsbexRepo(): IAdsbexService
    {
        return $this->container->get(IAdsbexService::class);
    }


    public function getOgnRepo(): IOgnService
    {
        return $this->container->get(IOgnService::class);
    }


    public function getOgnListenerRepo(): IOgnListenerRepo
    {
        return $this->container->get(IOgnListenerRepo::class);
    }


    public function getTrafficDetailRepo(): ITrafficDetailRepo
    {
        return $this->container->get(ITrafficDetailRepo::class);
    }


    public function getReadAdsbexTrafficUc(): IReadAdsbexTrafficUc
    {
        return $this->container->get(IReadAdsbexTrafficUc::class);
    }


    public function getReadAdsbexTrafficWithDetailsUc(): IReadAdsbexTrafficWithDetailsUc
    {
        return $this->container->get(IReadAdsbexTrafficWithDetailsUc::class);
    }


    public function getReadOgnTrafficUc(): IReadOgnTrafficUc
    {
        return $this->container->get(IReadOgnTrafficUc::class);
    }


    public function getReadTrafficDetailsUc(): IReadTrafficDetailsUc
    {
        return $this->container->get(IReadTrafficDetailsUc::class);
    }
}

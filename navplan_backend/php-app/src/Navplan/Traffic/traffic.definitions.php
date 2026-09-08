<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Traffic module.
 * Replaces the former ProdTrafficDiContainer.
 */

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
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ILoggingService;
use function DI\autowire;
use function DI\factory;

return [
    // OGN listener starter script path/file - only needed here, kept as consts.
    IAdsbexService::class => autowire(AdsbexService::class),
    IOgnListenerRepo::class => autowire(OgnListenerRepo::class),
    ITrafficDetailRepo::class => autowire(DbTrafficDetailRepo::class),
    IReadAdsbexTrafficUc::class => autowire(ReadAdsbexTrafficUc::class),
    IReadAdsbexTrafficWithDetailsUc::class => autowire(ReadAdsbexTrafficWithDetailsUc::class),
    IReadOgnTrafficUc::class => autowire(ReadOgnTrafficUc::class),
    IReadTrafficDetailsUc::class => autowire(ReadTrafficDetailsUc::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    TrafficController::class => autowire(),

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
            __DIR__, // OGN_LISTENER_STARTER_PATH
            "OgnListenerStarter.php" // OGN_LISTENER_STARTER_FILE
        );
    }),
];


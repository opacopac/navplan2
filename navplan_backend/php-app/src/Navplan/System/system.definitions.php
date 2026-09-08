<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the System module.
 * Loaded into the single, application-wide container built by ProdNavplanDiContainer.
 * Replaces the former ProdSystemDiContainer (which only existed to host its own
 * private PHP-DI Container instance).
 */

use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\System\Imagick\ImagickService;
use Navplan\System\Posix\CurlService;
use Navplan\System\Posix\FileService;
use Navplan\System\Posix\HttpService;
use Navplan\System\Posix\LoggingService;
use Navplan\System\Posix\MailService;
use Navplan\System\Posix\ProcService;
use Navplan\System\Posix\TimeService;
use function DI\autowire;
use function DI\factory;

return [
    // interface -> implementation bindings
    IHttpService::class => autowire(HttpService::class),
    IFileService::class => autowire(FileService::class),
    IMailService::class => autowire(MailService::class),
    ITimeService::class => autowire(TimeService::class),
    IProcService::class => autowire(ProcService::class),
    IImageService::class => autowire(ImagickService::class),
    ICurlService::class => autowire(CurlService::class),

    // LoggingService needs the scalar log level/file resolved from the config,
    // so it can't be wired via plain autowiring alone. Note: depends directly on
    // ISystemConfig (a narrow interface), not on IConfigDiContainer - this works
    // because config.definitions.php aliases ISystemConfig to the same instance.
    ILoggingService::class => factory(function (ISystemConfig $systemConfig, ITimeService $timeService) {
        $logFile = $systemConfig->getLogDir() . $systemConfig->getLogFile();

        return new LoggingService(
            $timeService,
            $systemConfig->getLogLevel(),
            $logFile
        );
    }),
];


<?php declare(strict_types=1);

namespace Navplan\System;

use DI\Container;
use DI\ContainerBuilder;
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


class ProdSystemDiContainer implements ISystemDiContainer
{
    private Container $container;


    public function __construct(
        ISystemConfig $systemConfig,
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            ISystemConfig::class => $systemConfig,

            // interface -> implementation bindings
            IHttpService::class => autowire(HttpService::class),
            IFileService::class => autowire(FileService::class),
            IMailService::class => autowire(MailService::class),
            ITimeService::class => autowire(TimeService::class),
            IProcService::class => autowire(ProcService::class),
            IImageService::class => autowire(ImagickService::class),
            ICurlService::class => autowire(CurlService::class),

            // LoggingService needs the scalar log level/file resolved from the config,
            // so it can't be wired via plain autowiring alone.
            ILoggingService::class => factory(function (ISystemConfig $systemConfig, ITimeService $timeService) {
                $logFile = $systemConfig->getLogDir() . $systemConfig->getLogFile();

                return new LoggingService(
                    $timeService,
                    $systemConfig->getLogLevel(),
                    $logFile
                );
            }),
        ]);

        $this->container = $builder->build();
    }


    public function getHttpService(): IHttpService
    {
        return $this->container->get(IHttpService::class);
    }


    public function getFileService(): IFileService
    {
        return $this->container->get(IFileService::class);
    }


    public function getMailService(): IMailService
    {
        return $this->container->get(IMailService::class);
    }


    public function getTimeService(): ITimeService
    {
        return $this->container->get(ITimeService::class);
    }


    public function getProcService(): IProcService
    {
        return $this->container->get(IProcService::class);
    }


    public function getLoggingService(): ILoggingService
    {
        return $this->container->get(ILoggingService::class);
    }


    public function getImageService(): IImageService
    {
        return $this->container->get(IImageService::class);
    }


    public function getCurlService(): ICurlService
    {
        return $this->container->get(ICurlService::class);
    }
}

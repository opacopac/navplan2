<?php declare(strict_types=1);

namespace NavplanTest\System;

use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\System\ProdSystemDiContainer;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdSystemDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdSystemDiContainerTest extends TestCase
{
    private function createContainer(): ProdSystemDiContainer
    {
        $systemConfig = $this->createStub(ISystemConfig::class);
        // empty log dir/file avoids the LoggingService trying to open a real log file
        $systemConfig->method('getTempDir')->willReturn('/tmp/');
        $systemConfig->method('getLogDir')->willReturn('');
        $systemConfig->method('getLogFile')->willReturn('');
        $systemConfig->method('getLogLevel')->willReturn(0);

        return new ProdSystemDiContainer($systemConfig);
    }


    public function testResolvesAllServices(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IHttpService::class, $container->getHttpService());
        $this->assertInstanceOf(IFileService::class, $container->getFileService());
        $this->assertInstanceOf(IMailService::class, $container->getMailService());
        $this->assertInstanceOf(ITimeService::class, $container->getTimeService());
        $this->assertInstanceOf(IProcService::class, $container->getProcService());
        $this->assertInstanceOf(ILoggingService::class, $container->getLoggingService());
        $this->assertInstanceOf(IImageService::class, $container->getImageService());
        $this->assertInstanceOf(ICurlService::class, $container->getCurlService());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getHttpService(), $container->getHttpService());
        $this->assertSame($container->getFileService(), $container->getFileService());
        $this->assertSame($container->getMailService(), $container->getMailService());
        $this->assertSame($container->getTimeService(), $container->getTimeService());
        $this->assertSame($container->getProcService(), $container->getProcService());
        $this->assertSame($container->getLoggingService(), $container->getLoggingService());
        $this->assertSame($container->getImageService(), $container->getImageService());
        $this->assertSame($container->getCurlService(), $container->getCurlService());
    }
}

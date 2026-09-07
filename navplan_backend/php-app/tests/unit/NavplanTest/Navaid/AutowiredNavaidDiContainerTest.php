<?php declare(strict_types=1);

namespace NavplanTest\Navaid;

use Navplan\Navaid\AutowiredNavaidDiContainer;
use Navplan\Navaid\Domain\Service\NavaidService;
use Navplan\Navaid\Rest\Controller\NavaidController;
use Navplan\System\Domain\Service\ILoggingService;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * POC test for the SOLID-refactoring proposal "autowiring DI container" (see
 * plan-backendRefactoringTopFindings.prompt.md, finding #1): verifies that
 * AutowiredNavaidDiContainer resolves the same object graph as the manually
 * wired ProdNavaidDiContainer would, without any hand-written "new X(...)" calls.
 */
class AutowiredNavaidDiContainerTest extends TestCase
{
    private function createContainer(): AutowiredNavaidDiContainer
    {
        $loggingService = new class implements ILoggingService {
            public function log(int $logLevel, string $message) {}
            public function error(string $message) {}
            public function warning(string $message) {}
            public function info(string $message) {}
            public function debug(string $message) {}
        };

        return new AutowiredNavaidDiContainer(
            $loggingService,
            new MockDbService(),
            new MockHttpService()
        );
    }


    public function testResolvesNavaidService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(NavaidService::class, $container->getNavaidService());
    }


    public function testResolvesNavaidController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(NavaidController::class, $container->getNavaidController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getNavaidService(), $container->getNavaidService());
        $this->assertSame($container->getNavaidController(), $container->getNavaidController());
    }
}


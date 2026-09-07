<?php declare(strict_types=1);

namespace NavplanTest\Traffic;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\Traffic\Domain\Service\IAdsbexService;
use Navplan\Traffic\Domain\Service\IOgnService;
use Navplan\Traffic\ProdTrafficDiContainer;
use Navplan\Traffic\Rest\Service\TrafficController;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockLoggingService;
use NavplanTest\System\Mock\MockProcService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdTrafficDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdTrafficDiContainerTest extends TestCase
{
    private function createContainer(): ProdTrafficDiContainer
    {
        return new ProdTrafficDiContainer(
            $this->createStub(IFileService::class),
            $this->createStub(ITimeService::class),
            new MockProcService(),
            new MockLoggingService(),
            $this->createStub(IDbService::class),
            new MockHttpService()
        );
    }


    public function testResolvesAdsbexRepo(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IAdsbexService::class, $container->getAdsbexRepo());
    }


    public function testResolvesOgnRepo(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IOgnService::class, $container->getOgnRepo());
    }


    public function testResolvesTrafficController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(TrafficController::class, $container->getTrafficController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAdsbexRepo(), $container->getAdsbexRepo());
        $this->assertSame($container->getOgnRepo(), $container->getOgnRepo());
        $this->assertSame($container->getTrafficController(), $container->getTrafficController());
        $this->assertSame($container->getReadTrafficDetailsUc(), $container->getReadTrafficDetailsUc());
    }
}

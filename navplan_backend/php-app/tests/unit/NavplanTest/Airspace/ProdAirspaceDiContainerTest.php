<?php declare(strict_types=1);

namespace NavplanTest\Airspace;

use Navplan\Airspace\Domain\Service\AirspaceService;
use Navplan\Airspace\Domain\Service\FirService;
use Navplan\Airspace\ProdAirspaceDiContainer;
use Navplan\Airspace\Rest\Controller\AirspaceController;
use Navplan\Airspace\Rest\Controller\FirController;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockLoggingService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAirspaceDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAirspaceDiContainerTest extends TestCase
{
    private function createContainer(): ProdAirspaceDiContainer
    {
        return new ProdAirspaceDiContainer(
            new MockLoggingService(),
            new MockDbService(),
            new MockHttpService()
        );
    }


    public function testResolvesAirspaceService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AirspaceService::class, $container->getAirspaceService());
    }


    public function testResolvesFirService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(FirService::class, $container->getFirService());
    }


    public function testResolvesAirspaceController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AirspaceController::class, $container->getAirspaceController());
    }


    public function testResolvesFirController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(FirController::class, $container->getFirController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAirspaceService(), $container->getAirspaceService());
        $this->assertSame($container->getFirService(), $container->getFirService());
    }
}

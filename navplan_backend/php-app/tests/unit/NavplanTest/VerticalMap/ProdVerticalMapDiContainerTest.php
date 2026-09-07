<?php declare(strict_types=1);

namespace NavplanTest\VerticalMap;

use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\VerticalMap\Domain\Service\IVerticalMapService;
use Navplan\VerticalMap\ProdVerticalMapDiContainer;
use Navplan\VerticalMap\Rest\Service\VerticalMapController;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdVerticalMapDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdVerticalMapDiContainerTest extends TestCase
{
    private function createContainer(): ProdVerticalMapDiContainer
    {
        return new ProdVerticalMapDiContainer(
            $this->createStub(ITerrainService::class),
            $this->createStub(IAirspaceService::class),
            $this->createStub(IMeteoForecastVerticalCloudRepo::class),
            $this->createStub(IMeteoForecastVerticalWindRepo::class),
            new MockHttpService()
        );
    }


    public function testResolvesVerticalMapService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IVerticalMapService::class, $container->getVerticalMapService());
    }


    public function testResolvesVerticalMapController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(VerticalMapController::class, $container->getVerticalMapController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getVerticalMapService(), $container->getVerticalMapService());
        $this->assertSame($container->getVerticalMapController(), $container->getVerticalMapController());
    }
}

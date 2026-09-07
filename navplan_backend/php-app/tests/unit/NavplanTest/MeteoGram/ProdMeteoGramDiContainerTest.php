<?php declare(strict_types=1);

namespace NavplanTest\MeteoGram;

use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Service\CloudMeteoGramService;
use Navplan\MeteoGram\ProdMeteoGramDiContainer;
use Navplan\MeteoGram\Rest\Service\ReadCloudMeteogramController;
use Navplan\Terrain\Domain\Service\ITerrainService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdMeteoGramDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdMeteoGramDiContainerTest extends TestCase
{
    private function createContainer(): ProdMeteoGramDiContainer
    {
        return new ProdMeteoGramDiContainer(
            new MockHttpService(),
            $this->createStub(IMeteoForecastVerticalCloudRepo::class),
            $this->createStub(IMeteoForecastPrecipRepo::class),
            $this->createStub(IMeteoForecastTempRepo::class),
            $this->createStub(ITerrainService::class)
        );
    }


    public function testResolvesCloudMeteoGramService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(CloudMeteoGramService::class, $container->getCloudMeteoGramService());
    }


    public function testResolvesReadCloudMeteoGramController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(
            ReadCloudMeteogramController::class,
            $container->getReadCloudMeteoGramController()
        );
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getCloudMeteoGramService(), $container->getCloudMeteoGramService());
        $this->assertSame(
            $container->getReadCloudMeteoGramController(),
            $container->getReadCloudMeteoGramController()
        );
    }
}

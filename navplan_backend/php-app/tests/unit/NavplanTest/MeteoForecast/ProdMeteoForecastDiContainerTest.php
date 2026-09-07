<?php declare(strict_types=1);

namespace NavplanTest\MeteoForecast;

use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinForecastRepo;
use Navplan\MeteoForecast\ProdMeteoForecastDiContainer;
use Navplan\MeteoForecast\Rest\Service\MeteoForecastController;
use Navplan\System\Domain\Service\IFileService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdMeteoForecastDiContainer resolves the full object graph via
 * PHP-DI autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdMeteoForecastDiContainerTest extends TestCase
{
    private function createContainer(): ProdMeteoForecastDiContainer
    {
        return new ProdMeteoForecastDiContainer(
            $this->createStub(IFileService::class),
            new MockHttpService(),
            $this->createStub(IMeteoForecastConfig::class)
        );
    }


    public function testResolvesMeteoForecastRepo(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(MeteoBinForecastRepo::class, $container->getMeteoForecastRepo());
    }


    public function testResolvesMeteoForecastController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(MeteoForecastController::class, $container->getMeteoForecastController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getMeteoForecastRepo(), $container->getMeteoForecastRepo());
        $this->assertSame($container->getMeteoForecastController(), $container->getMeteoForecastController());
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\Aerodrome;

use Navplan\Aerodrome\Domain\Service\AirportService;
use Navplan\Aerodrome\ProdAerodromeDiContainer;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAerodromeDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAerodromeDiContainerTest extends TestCase
{
    private function createContainer(): ProdAerodromeDiContainer
    {
        return new ProdAerodromeDiContainer(
            new MockDbService(),
            $this->createStub(ILoggingService::class),
            new MockHttpService(),
            $this->createStub(IAirportChartService::class),
            $this->createStub(IWebcamByIcaoQuery::class)
        );
    }


    public function testResolvesAirportService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AirportService::class, $container->getAirportService());
    }


    public function testResolvesAirportController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AirportController::class, $container->getAirportController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAirportService(), $container->getAirportService());
        $this->assertSame($container->getAirportController(), $container->getAirportController());
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\AerodromeChart;

use Navplan\AerodromeChart\Domain\Service\AirportChartService;
use Navplan\AerodromeChart\Domain\Service\IAerodromeChartConfig;
use Navplan\AerodromeChart\ProdAerodromeChartDiContainer;
use Navplan\AerodromeChart\Rest\Controller\AdChartController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\User\Domain\Service\IUserService;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockLoggingService;
use NavplanTest\System\Mock\MockProcService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAerodromeChartDiContainer resolves the full object graph via
 * PHP-DI autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAerodromeChartDiContainerTest extends TestCase
{
    private function createContainer(): ProdAerodromeChartDiContainer
    {
        return new ProdAerodromeChartDiContainer(
            $this->createStub(IAerodromeChartConfig::class),
            new MockDbService(),
            $this->createStub(IFileService::class),
            $this->createStub(IImageService::class),
            $this->createStub(IUserService::class),
            new MockHttpService(),
            new MockProcService(),
            new MockLoggingService()
        );
    }


    public function testResolvesAirportChartService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AirportChartService::class, $container->getAirportChartService());
    }


    public function testResolvesAirportChartController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AdChartController::class, $container->getAirportChartController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAirportChartService(), $container->getAirportChartService());
        $this->assertSame($container->getAirportChartController(), $container->getAirportChartController());
    }
}

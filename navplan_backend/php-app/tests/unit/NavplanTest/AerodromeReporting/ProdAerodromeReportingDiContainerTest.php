<?php declare(strict_types=1);

namespace NavplanTest\AerodromeReporting;

use Navplan\AerodromeReporting\ProdAerodromeReportingDiContainer;
use Navplan\AerodromeReporting\Rest\Controller\AdReportingPointController;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAerodromeReportingDiContainer resolves the full object graph via
 * PHP-DI autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAerodromeReportingDiContainerTest extends TestCase
{
    private function createContainer(): ProdAerodromeReportingDiContainer
    {
        return new ProdAerodromeReportingDiContainer(
            new MockDbService(),
            new MockHttpService()
        );
    }


    public function testResolvesReportingPointController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AdReportingPointController::class, $container->getReportingPointController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame(
            $container->getAerodromeReportingByExtentQuery(),
            $container->getAerodromeReportingByExtentQuery()
        );
        $this->assertSame($container->getReportingPointController(), $container->getReportingPointController());
    }
}

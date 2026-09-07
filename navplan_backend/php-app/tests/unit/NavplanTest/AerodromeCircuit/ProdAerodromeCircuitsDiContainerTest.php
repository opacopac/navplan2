<?php declare(strict_types=1);

namespace NavplanTest\AerodromeCircuit;

use Navplan\AerodromeCircuit\Persistence\Repo\DbAirportCircuitRepo;
use Navplan\AerodromeCircuit\ProdAerodromeCircuitsDiContainer;
use Navplan\AerodromeCircuit\Rest\Controller\AdCircuitController;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAerodromeCircuitsDiContainer resolves the full object graph via
 * PHP-DI autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAerodromeCircuitsDiContainerTest extends TestCase
{
    private function createContainer(): ProdAerodromeCircuitsDiContainer
    {
        return new ProdAerodromeCircuitsDiContainer(
            new MockDbService(),
            new MockHttpService()
        );
    }


    public function testResolvesAirportCircuitService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(DbAirportCircuitRepo::class, $container->getAirportCircuitService());
    }


    public function testResolvesAirportCircuitController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AdCircuitController::class, $container->getAirportCircuitController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAirportCircuitService(), $container->getAirportCircuitService());
        $this->assertSame($container->getAirportCircuitController(), $container->getAirportCircuitController());
    }
}

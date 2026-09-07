<?php declare(strict_types=1);

namespace NavplanTest\Flightroute;

use Navplan\Flightroute\Domain\Service\FlightrouteService;
use Navplan\Flightroute\ProdFlightrouteDiContainer;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\User\Domain\Service\IUserService;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdFlightrouteDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdFlightrouteDiContainerTest extends TestCase
{
    private function createContainer(): ProdFlightrouteDiContainer
    {
        return new ProdFlightrouteDiContainer(
            $this->createStub(IUserService::class),
            new MockDbService(),
            new MockHttpService()
        );
    }


    public function testResolvesFlightrouteService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(FlightrouteService::class, $container->getFlightrouteService());
    }


    public function testResolvesFlightrouteController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(FlightrouteController::class, $container->getFlightrouteController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getFlightrouteService(), $container->getFlightrouteService());
        $this->assertSame($container->getFlightrouteController(), $container->getFlightrouteController());
    }
}

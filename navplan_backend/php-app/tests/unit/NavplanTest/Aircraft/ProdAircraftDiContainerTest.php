<?php declare(strict_types=1);

namespace NavplanTest\Aircraft;

use Navplan\Aircraft\Domain\Service\AircraftService;
use Navplan\Aircraft\Domain\Service\AircraftTypeDesignatorService;
use Navplan\Aircraft\ProdAircraftDiContainer;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Aircraft\Rest\Controller\AircraftTypeDesignatorController;
use Navplan\User\Domain\Service\IUserService;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockLoggingService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAircraftDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAircraftDiContainerTest extends TestCase
{
    private function createContainer(): ProdAircraftDiContainer
    {
        return new ProdAircraftDiContainer(
            $this->createStub(IUserService::class),
            new MockDbService(),
            new MockHttpService(),
            new MockLoggingService()
        );
    }


    public function testResolvesAircraftService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AircraftService::class, $container->getAircraftService());
    }


    public function testResolvesAircraftController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AircraftController::class, $container->getAircraftController());
    }


    public function testResolvesAircraftTypeDesignatorService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(
            AircraftTypeDesignatorService::class,
            $container->getAircraftTypeDesignatorService()
        );
    }


    public function testResolvesAircraftTypeDesignatorController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(
            AircraftTypeDesignatorController::class,
            $container->getAircraftTypeDesignatorController()
        );
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAircraftService(), $container->getAircraftService());
        $this->assertSame($container->getAircraftController(), $container->getAircraftController());
    }
}

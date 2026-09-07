<?php declare(strict_types=1);

namespace NavplanTest\Notam;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\ProdNotamDiContainer;
use Navplan\Notam\Rest\Service\NotamController;
use Navplan\System\Db\Domain\Service\IDbService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockLoggingService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdNotamDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdNotamDiContainerTest extends TestCase
{
    private function createContainer(): ProdNotamDiContainer
    {
        return new ProdNotamDiContainer(
            $this->createStub(IDbService::class),
            new MockHttpService(),
            new MockLoggingService(),
            $this->createStub(IFirService::class),
            $this->createStub(IAirportService::class)
        );
    }


    public function testResolvesNotamService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(INotamService::class, $container->getNotamService());
    }


    public function testResolvesNotamController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(NotamController::class, $container->getNotamController());
    }


    public function testGettersReturnSingletons(): void
    {
        // Note: getNotamGeometryParser() is intentionally not exercised here: the
        // underlying NotamGeometryParser.php file mixes a class definition with
        // top-level CLI script code (a pre-existing design smell, unrelated to this
        // refactoring), which fails as soon as the class is autoloaded outside of
        // that CLI context - the same holds true for the pre-refactoring container.
        $container = $this->createContainer();

        $this->assertSame($container->getNotamService(), $container->getNotamService());
        $this->assertSame($container->getNotamController(), $container->getNotamController());
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\Track;

use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\ProdTrackDiContainer;
use Navplan\Track\Rest\Service\TrackController;
use Navplan\User\Domain\Service\IUserService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdTrackDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdTrackDiContainerTest extends TestCase
{
    private function createContainer(): ProdTrackDiContainer
    {
        return new ProdTrackDiContainer(
            $this->createStub(IDbService::class),
            new MockHttpService(),
            $this->createStub(IUserService::class),
            $this->createStub(IExportService::class)
        );
    }


    public function testResolvesTrackService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(ITrackService::class, $container->getTrackService());
    }


    public function testResolvesTrackController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(TrackController::class, $container->getTrackController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getTrackService(), $container->getTrackService());
        $this->assertSame($container->getTrackController(), $container->getTrackController());
    }
}

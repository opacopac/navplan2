<?php declare(strict_types=1);

namespace NavplanTest\Exporter;

use Navplan\Exporter\FileExportService\FileExportService;
use Navplan\Exporter\ProdExportDiContainer;
use Navplan\Exporter\Rest\Controller\ExporterController;
use Navplan\System\Domain\Service\IFileService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdExportDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdExportDiContainerTest extends TestCase
{
    private function createContainer(): ProdExportDiContainer
    {
        return new ProdExportDiContainer(
            $this->createStub(IFileService::class),
            new MockHttpService()
        );
    }


    public function testResolvesExportService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(FileExportService::class, $container->getExportService());
    }


    public function testResolvesExportController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(ExporterController::class, $container->getExportController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getExportService(), $container->getExportService());
        $this->assertSame($container->getExportController(), $container->getExportController());
    }
}

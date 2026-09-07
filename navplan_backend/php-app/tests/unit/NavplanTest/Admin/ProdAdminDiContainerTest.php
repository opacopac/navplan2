<?php declare(strict_types=1);

namespace NavplanTest\Admin;

use Navplan\Admin\Domain\Service\AdminServiceImpl;
use Navplan\Admin\ProdAdminDiContainer;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdAdminDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdAdminDiContainerTest extends TestCase
{
    private function createContainer(): ProdAdminDiContainer
    {
        return new ProdAdminDiContainer(
            $this->createStub(IOpenAipImporter::class)
        );
    }


    public function testResolvesAdminService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(AdminServiceImpl::class, $container->getAdminService());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getAdminService(), $container->getAdminService());
    }
}

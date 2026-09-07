<?php declare(strict_types=1);

namespace NavplanTest\Terrain;

use Navplan\System\Domain\Service\IFileService;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\Terrain\ProdTerrainDiContainer;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdTerrainDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdTerrainDiContainerTest extends TestCase
{
    private function createContainer(): ProdTerrainDiContainer
    {
        return new ProdTerrainDiContainer(
            $this->createStub(IFileService::class),
            $this->createStub(ITerrainConfig::class)
        );
    }


    public function testResolvesTerrainService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(ITerrainService::class, $container->getTerrainService());
    }


    public function testGetterReturnsSingleton(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getTerrainService(), $container->getTerrainService());
    }
}

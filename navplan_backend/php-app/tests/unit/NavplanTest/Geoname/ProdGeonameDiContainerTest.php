<?php declare(strict_types=1);

namespace NavplanTest\Geoname;

use Navplan\Geoname\Domain\Service\GeonameService;
use Navplan\Geoname\ProdGeonameDiContainer;
use Navplan\Terrain\Domain\Service\ITerrainService;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdGeonameDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdGeonameDiContainerTest extends TestCase
{
    private function createContainer(): ProdGeonameDiContainer
    {
        return new ProdGeonameDiContainer(
            new MockDbService(),
            $this->createStub(ITerrainService::class)
        );
    }


    public function testResolvesGeonameService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(GeonameService::class, $container->getGeonameService());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getGeonameService(), $container->getGeonameService());
    }
}

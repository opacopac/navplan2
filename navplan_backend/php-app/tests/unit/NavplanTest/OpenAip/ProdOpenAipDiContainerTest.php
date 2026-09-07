<?php declare(strict_types=1);

namespace NavplanTest\OpenAip;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\ProdOpenAipDiContainer;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ICurlService;
use NavplanTest\System\Mock\MockLoggingService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdOpenAipDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdOpenAipDiContainerTest extends TestCase
{
    private function createContainer(): ProdOpenAipDiContainer
    {
        return new ProdOpenAipDiContainer(
            $this->createStub(IAirportService::class),
            $this->createStub(IAirspaceService::class),
            $this->createStub(INavaidService::class),
            new MockLoggingService(),
            $this->createStub(IDbService::class),
            $this->createStub(ICurlService::class)
        );
    }


    public function testResolvesOpenAipApiService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IOpenAipService::class, $container->getOpenAipApiService());
    }


    public function testResolvesOpenAipImporter(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IOpenAipImporter::class, $container->getOpenAipImporter());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getOpenAipApiService(), $container->getOpenAipApiService());
        $this->assertSame($container->getOpenAipImporter(), $container->getOpenAipImporter());
        $this->assertSame($container->getOpenAipConfig(), $container->getOpenAipConfig());
    }
}

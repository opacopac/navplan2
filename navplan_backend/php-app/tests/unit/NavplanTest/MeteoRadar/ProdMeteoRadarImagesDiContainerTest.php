<?php declare(strict_types=1);

namespace NavplanTest\MeteoRadar;

use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesConfig;
use Navplan\MeteoRadar\FileSystem\Service\FileSystemRadarImagesRepo;
use Navplan\MeteoRadar\ProdMeteoRadarImagesDiContainer;
use Navplan\MeteoRadar\Rest\Service\MeteoRadarImageController;
use Navplan\System\Domain\Service\IFileService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdMeteoRadarImagesDiContainer resolves the full object graph via
 * PHP-DI autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdMeteoRadarImagesDiContainerTest extends TestCase
{
    private function createContainer(): ProdMeteoRadarImagesDiContainer
    {
        return new ProdMeteoRadarImagesDiContainer(
            $this->createStub(IFileService::class),
            new MockHttpService(),
            $this->createStub(IMeteoRadarImagesConfig::class)
        );
    }


    public function testResolvesMeteoRadarImagesRepo(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(FileSystemRadarImagesRepo::class, $container->getMeteoRadarImagesRepo());
    }


    public function testResolvesMeteoRadarImagesController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(MeteoRadarImageController::class, $container->getMeteoRadarImagesController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getMeteoRadarImagesRepo(), $container->getMeteoRadarImagesRepo());
        $this->assertSame(
            $container->getMeteoRadarImagesController(),
            $container->getMeteoRadarImagesController()
        );
    }
}

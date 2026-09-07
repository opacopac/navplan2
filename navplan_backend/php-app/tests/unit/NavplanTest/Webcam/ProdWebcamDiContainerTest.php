<?php declare(strict_types=1);

namespace NavplanTest\Webcam;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\ProdWebcamDiContainer;
use Navplan\Webcam\Rest\Service\WebcamController;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdWebcamDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdWebcamDiContainerTest extends TestCase
{
    private function createContainer(): ProdWebcamDiContainer
    {
        return new ProdWebcamDiContainer(
            $this->createStub(IDbService::class),
            new MockHttpService()
        );
    }


    public function testResolvesWebcamByExtentQuery(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IWebcamByExtentQuery::class, $container->getWebcamByExtentQuery());
    }


    public function testResolvesWebcamByIcaoQuery(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(IWebcamByIcaoQuery::class, $container->getWebcamByIcaoQuery());
    }


    public function testResolvesWebcamController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(WebcamController::class, $container->getWebcamController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getWebcamByExtentQuery(), $container->getWebcamByExtentQuery());
        $this->assertSame($container->getWebcamByIcaoQuery(), $container->getWebcamByIcaoQuery());
        $this->assertSame($container->getWebcamController(), $container->getWebcamController());
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma;

use Navplan\MeteoSma\Persistence\Service\DbMeteoSmaRepo;
use Navplan\MeteoSma\ProdMeteoSmaDiContainer;
use Navplan\MeteoSma\Rest\Service\MeteoSmaController;
use Navplan\System\Domain\Service\ITimeService;
use NavplanTest\System\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdMeteoSmaDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdMeteoSmaDiContainerTest extends TestCase
{
    private function createContainer(): ProdMeteoSmaDiContainer
    {
        return new ProdMeteoSmaDiContainer(
            new MockDbService(),
            $this->createStub(ITimeService::class),
            new MockHttpService()
        );
    }


    public function testResolvesMeteoSmaService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(DbMeteoSmaRepo::class, $container->getMeteoSmaService());
    }


    public function testResolvesMeteoSmaController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(MeteoSmaController::class, $container->getMeteoSmaController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getMeteoSmaService(), $container->getMeteoSmaService());
        $this->assertSame($container->getMeteoSmaController(), $container->getMeteoSmaController());
    }
}

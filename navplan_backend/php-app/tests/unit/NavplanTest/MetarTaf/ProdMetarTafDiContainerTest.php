<?php declare(strict_types=1);

namespace NavplanTest\MetarTaf;

use Navplan\MetarTaf\Domain\Service\MetarTafService;
use Navplan\MetarTaf\ProdMetarTafDiContainer;
use Navplan\MetarTaf\Rest\Service\ReadMetarTafController;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdMetarTafDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdMetarTafDiContainerTest extends TestCase
{
    private function createContainer(): ProdMetarTafDiContainer
    {
        return new ProdMetarTafDiContainer(
            new MockHttpService()
        );
    }


    public function testResolvesMetarTafService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(MetarTafService::class, $container->getMetarTafService());
    }


    public function testResolvesReadMetarTafController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(ReadMetarTafController::class, $container->getReadMetarTafController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getMetarTafService(), $container->getMetarTafService());
        $this->assertSame($container->getReadMetarTafController(), $container->getReadMetarTafController());
    }
}

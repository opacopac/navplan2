<?php declare(strict_types=1);

namespace NavplanTest\Search;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Geoname\Domain\Service\IGeonameService;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Search\Domain\Service\ISearchService;
use Navplan\Search\ProdSearchDiContainer;
use Navplan\Search\Rest\Service\SearchController;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


/**
 * Verifies that ProdSearchDiContainer resolves the full object graph via PHP-DI
 * autowiring (see plan-backendRefactoringTopFindings.prompt.md, finding #1).
 */
class ProdSearchDiContainerTest extends TestCase
{
    private function createContainer(): ProdSearchDiContainer
    {
        return new ProdSearchDiContainer(
            new MockHttpService(),
            $this->createStub(ISearchUserPointUc::class),
            $this->createStub(IAirspaceService::class),
            $this->createStub(INotamSearchByPositionQuery::class),
            $this->createStub(IAirportService::class),
            $this->createStub(IAerodromeReportingByPositionQuery::class),
            $this->createStub(IAerodromeReportingByTextQuery::class),
            $this->createStub(INavaidService::class),
            $this->createStub(IGeonameService::class)
        );
    }


    public function testResolvesSearchService(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(ISearchService::class, $container->getSearchService());
    }


    public function testResolvesSearchController(): void
    {
        $container = $this->createContainer();

        $this->assertInstanceOf(SearchController::class, $container->getSearchController());
    }


    public function testGettersReturnSingletons(): void
    {
        $container = $this->createContainer();

        $this->assertSame($container->getSearchService(), $container->getSearchService());
        $this->assertSame($container->getSearchController(), $container->getSearchController());
    }
}

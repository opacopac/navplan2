<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Domain\SearchResult;
use Navplan\Search\Rest\RestSearchItemType;
use Navplan\Search\Rest\RestSearchResult;
use NavplanTest\MockNavplanConfig;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use PHPUnit\Framework\TestCase;


class SearchResultRestTest extends TestCase {
    private $result;
    private $config;


    private function getSearchResult(): SearchResult {
        return $this->result;
    }


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->result = new SearchResult(
            [ DummyAirport1::create(), DummyAirport1::create() ],
            [ DummyNavaid1::create(), DummyNavaid1::create() ],
            [ DummyAirspace1::create(), DummyAirspace1::create() ],
            [ DummyReportingPoint1::create(), DummyReportingSector1::create() ],
            [ DummyUserPoint1::create(), DummyUserPoint2::create() ],
            [ DummyWebcam1::create(), DummyWebcam2::create() ],
            [],
            []
        );
    }


    public function test_toRest() {
        $resArray = RestSearchResult::toRest($this->getSearchResult());
        $this->assertNotNull($resArray);
        $this->assertEquals(count($this->getSearchResult()->airports), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::AIRPORTS)]));
        $this->assertEquals(count($this->getSearchResult()->navaids), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::NAVAIDS)]));
        $this->assertEquals(count($this->getSearchResult()->airspaces), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::AIRSPACES)]));
        $this->assertEquals(count($this->getSearchResult()->reportingPoints), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::REPORTINGPOINTS)]));
        $this->assertEquals(count($this->getSearchResult()->userPoints), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::USERPOINTS)]));
        $this->assertEquals(count($this->getSearchResult()->webcams), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::WEBCAMS)]));
        $this->assertEquals(count($this->getSearchResult()->geonames), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::GEONAMES)]));
        $this->assertEquals(count($this->getSearchResult()->notams), count($resArray[RestSearchItemType::getRestKeyFromType(SearchItemType::NOTAMS)]));
    }
}
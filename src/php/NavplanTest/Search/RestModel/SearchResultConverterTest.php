<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\DomainModel\SearchResult;
use Navplan\Search\RestModel\SearchItemTypeConverter;
use Navplan\Search\RestModel\SearchResultConverter;
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


class SearchResultConverterTest extends TestCase {
    private SearchResult $result;


    protected function setUp(): void {
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
        $resArray = SearchResultConverter::toRest($this->result);
        $this->assertNotNull($resArray);
        $this->assertEquals(count($this->result->airports), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::AIRPORTS)]));
        $this->assertEquals(count($this->result->navaids), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::NAVAIDS)]));
        $this->assertEquals(count($this->result->airspaces), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::AIRSPACES)]));
        $this->assertEquals(count($this->result->reportingPoints), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::REPORTINGPOINTS)]));
        $this->assertEquals(count($this->result->userPoints), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::USERPOINTS)]));
        $this->assertEquals(count($this->result->webcams), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::WEBCAMS)]));
        $this->assertEquals(count($this->result->geonames), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::GEONAMES)]));
        $this->assertEquals(count($this->result->notams), count($resArray[SearchItemTypeConverter::getRestKeyFromType(SearchItemType::NOTAMS)]));
    }
}

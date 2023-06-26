<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\Domain\Model\SearchResult;
use Navplan\Search\Rest\Model\RestSearchItemTypeConverter;
use Navplan\Search\Rest\Model\RestSearchResultConverter;
use NavplanTest\Aerodrome\Mocks\DummyAirport1;
use NavplanTest\Aerodrome\Mocks\DummyReportingPoint1;
use NavplanTest\Aerodrome\Mocks\DummyReportingSector1;
use NavplanTest\Enroute\Mocks\DummyAirspace1;
use NavplanTest\Enroute\Mocks\DummyNavaid1;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\Webcam\Mocks\DummyWebcam1;
use NavplanTest\Webcam\Mocks\DummyWebcam2;
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
            [],
            []
        );
    }


    public function test_toRest() {
        $resArray = RestSearchResultConverter::toRest($this->result);
        $this->assertNotNull($resArray);
        $this->assertSameSize($this->result->airports, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::AIRPORTS)]);
        $this->assertSameSize($this->result->navaids, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::NAVAIDS)]);
        $this->assertSameSize($this->result->airspaces, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::AIRSPACES)]);
        $this->assertSameSize($this->result->reportingPoints, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::REPORTINGPOINTS)]);
        $this->assertSameSize($this->result->userPoints, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::USERPOINTS)]);
        $this->assertSameSize($this->result->webcams, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::WEBCAMS)]);
        $this->assertSameSize($this->result->geonames, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::GEONAMES)]);
        $this->assertSameSize($this->result->notams, $resArray[RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::NOTAMS)]);
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\Rest\Model\RestSearchByExtentQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByExtentQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            RestSearchByExtentQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            RestSearchByExtentQueryConverter::ARG_MIN_LON => "7.0",
            RestSearchByExtentQueryConverter::ARG_MIN_LAT => "47.0",
            RestSearchByExtentQueryConverter::ARG_MAX_LON => "7.9",
            RestSearchByExtentQueryConverter::ARG_MAX_LAT => "47.9",
            RestSearchByExtentQueryConverter::ARG_ZOOM => "11",
            RestSearchByExtentQueryConverter::ARG_MIN_NOTAM_TIME => "1558819678",
            RestSearchByExtentQueryConverter::ARG_MAX_NOTAM_TIME => "1558919678",
            RestSearchByExtentQueryConverter::ARG_TOKEN => NULL, // TODO
        );
    }


    public function testFromArray() {
        $query = RestSearchByExtentQueryConverter::fromRest($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(7.0, $query->extent->minPos->longitude);
        $this->assertEquals(47.0, $query->extent->minPos->latitude);
        $this->assertEquals(7.9, $query->extent->maxPos->longitude);
        $this->assertEquals(47.9, $query->extent->maxPos->latitude);
        $this->assertEquals(11, $query->zoom);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
        $this->assertEquals(NULL, $query->token);
    }
}

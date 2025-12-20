<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\Rest\Model\RestSearchByPositionQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByPositionQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            RestSearchByPositionQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            RestSearchByPositionQueryConverter::ARG_LON => "7.0",
            RestSearchByPositionQueryConverter::ARG_LAT => "47.0",
            RestSearchByPositionQueryConverter::ARG_RADIUS => "0.5",
            RestSearchByPositionQueryConverter::ARG_MAX_RESULTS => "25",
            "tsinterval" => "1558819678,1558919678",
            RestSearchByPositionQueryConverter::ARG_TOKEN => NULL, // TODO
        );
    }


    public function testFromArray() {
        $query = RestSearchByPositionQueryConverter::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(7.0, $query->position->longitude);
        $this->assertEquals(47.0, $query->position->latitude);
        $this->assertEquals(0.5, $query->maxRadius_deg);
        $this->assertEquals(1558819678, $query->notamInterval->start->toMs());
        $this->assertEquals(1558919678, $query->notamInterval->end->toMs());
        $this->assertEquals(NULL, $query->token);
    }
}

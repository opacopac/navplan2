<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\Rest\Model\RestSearchByIcaoQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByIcaoQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            RestSearchByIcaoQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            RestSearchByIcaoQueryConverter::ARG_ICAO => "LSZB,LSZG,LSMP",
            "tsinterval" => "1558819678,1558919678",
        );
    }


    public function testFromArray() {
        $query = RestSearchByIcaoQueryConverter::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(['LSZB', 'LSZG', 'LSMP'], $query->icaoList);
        $this->assertEquals(1558819678, $query->notamInterval->start->toMs());
        $this->assertEquals(1558919678, $query->notamInterval->end->toMs());
    }
}

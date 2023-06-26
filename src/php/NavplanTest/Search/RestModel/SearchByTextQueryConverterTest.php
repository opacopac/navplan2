<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\Rest\Model\RestSearchByTextQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByTextQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            RestSearchByTextQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            RestSearchByTextQueryConverter::ARG_SEARCH_TEXT => "LSZB",
            RestSearchByTextQueryConverter::ARG_TOKEN => NULL, // TODO
        );
    }


    public function test_FromArray() {
        $query = RestSearchByTextQueryConverter::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals("LSZB", $query->searchText);
        $this->assertEquals(NULL, $query->token);
    }
}

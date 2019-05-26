<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\SearchByTextQueryRest;
use PHPUnit\Framework\TestCase;


class SearchByTextQueryRestTest extends TestCase {
    private $args;


    protected function setUp(): void {
        $this->args = array(
            SearchByTextQueryRest::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByTextQueryRest::ARG_SEARCH_TEXT => "LSZB",
            SearchByTextQueryRest::ARG_TOKEN => NULL, // TODO
        );
    }


    public function test_FromArray() {
        $query = SearchByTextQueryRest::fromArray($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals("LSZB", $query->searchText);
        $this->assertEquals(NULL, $query->token);
    }
}

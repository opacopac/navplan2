<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\SearchItemTypeRest;
use PHPUnit\Framework\TestCase;


class SearchItemTypeRestTest extends TestCase {
    public function test_fromString() {
        $siTypes = SearchItemTypeRest::fromString('airports,navaids');
        $this->assertEquals(2, count($siTypes));
        $this->assertEquals(SearchItemType::AIRPORTS, $siTypes[0]);
        $this->assertEquals(SearchItemType::NAVAIDS, $siTypes[1]);
    }


    public function test_getRestKeyFromType() {
        $restKey = SearchItemTypeRest::getRestKeyFromType(SearchItemType::WEBCAMS);
        $type = SearchItemTypeRest::getTypefromRestKey($restKey);
        $this->assertEquals(SearchItemType::WEBCAMS, $type);
    }


    public function test_getTypefromRestKey() {
        $type = SearchItemTypeRest::getTypefromRestKey('airports');
        $restKey = SearchItemTypeRest::getRestKeyFromType($type);
        $this->assertEquals('airports', $restKey);
    }
}

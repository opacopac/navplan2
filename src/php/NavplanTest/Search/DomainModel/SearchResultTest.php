<?php declare(strict_types=1);

namespace NavplanTest\Search\DomainModel;

use NavplanTest\Search\Mocks\DummySearchResult1;
use PHPUnit\Framework\TestCase;


class SearchResultTest extends TestCase {
    public function test__construct() {
        $result = DummySearchResult1::create();
        $this->assertNotNull($result);
    }
}

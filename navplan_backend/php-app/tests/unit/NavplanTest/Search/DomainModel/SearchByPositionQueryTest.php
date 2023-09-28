<?php declare(strict_types=1);

namespace NavplanTest\Search\DomainModel;

use NavplanTest\Search\Mocks\DummySearchByPositionQuery1;
use PHPUnit\Framework\TestCase;


class SearchByPositionQueryTest extends TestCase {
    public function test__construct() {
        $query = DummySearchByPositionQuery1::create();
        $this->assertNotNull($query);
    }
}

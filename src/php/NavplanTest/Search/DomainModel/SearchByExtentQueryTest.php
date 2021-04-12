<?php declare(strict_types=1);

namespace NavplanTest\Search\DomainModel;

use NavplanTest\Search\Mocks\DummySearchByExtentQuery1;
use PHPUnit\Framework\TestCase;


class SearchByExtentQueryTest extends TestCase {
    public function test__construct() {
        $query = DummySearchByExtentQuery1::create();
        $this->assertNotNull($query);
    }
}

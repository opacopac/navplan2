<?php declare(strict_types=1);

namespace NavplanTest\Search\DomainModel;

use NavplanTest\Search\Mocks\DummySearchByIcaoQuery1;
use PHPUnit\Framework\TestCase;


class SearchByIcaoQueryTest extends TestCase {
    public function test__construct() {
        $query = DummySearchByIcaoQuery1::create();
        $this->assertNotNull($query);
    }
}

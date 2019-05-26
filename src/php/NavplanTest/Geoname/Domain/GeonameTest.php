<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Domain;

use NavplanTest\Geoname\Mocks\DummyGeoname1;
use PHPUnit\Framework\TestCase;


class GeonameTest extends TestCase {
    public function test__construct() {
        $instance = DummyGeoname1::create();
        $this->assertNotNull($instance);
    }
}

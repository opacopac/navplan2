<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Rest;

use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geoname\Rest\RestGeoname;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use PHPUnit\Framework\TestCase;


class RestGeonameTest extends TestCase {
    public function test_toArray() {
        $geo = DummyGeoname1::create();
        $geoRest = RestGeoname::toArray($geo);

        $this->assertEquals($geo->id, $geoRest["id"]);
        $this->assertEquals($geo->name, $geoRest["name"]);
        $this->assertEquals($geo->searchresultname, $geoRest["searchresultname"]);
        $this->assertEquals($geo->feature_class, $geoRest["feature_class"]);
        $this->assertEquals($geo->feature_code, $geoRest["feature_code"]);
        $this->assertEquals($geo->country, $geoRest["country"]);
        $this->assertEquals($geo->admin1, $geoRest["admin1"]);
        $this->assertEquals($geo->admin2, $geoRest["admin2"]);
        $this->assertEquals($geo->population, $geoRest["population"]);
        $this->assertEquals($geo->position->latitude, $geoRest["latitude"]);
        $this->assertEquals($geo->position->longitude, $geoRest["longitude"]);
        $this->assertEquals($geo->elevation->value, $geoRest["elevation"][0]);
        $this->assertEquals(AltitudeUnit::toString($geo->elevation->unit), $geoRest["elevation"][1]);
        $this->assertEquals(AltitudeReference::toString($geo->elevation->reference), $geoRest["elevation"][2]);
    }
}

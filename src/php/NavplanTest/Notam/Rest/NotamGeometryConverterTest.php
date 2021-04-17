<?php declare(strict_types=1);

namespace NavplanTest\Notam\RestModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\MultiRing2d;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\DomainModel\Ring2d;
use Navplan\Geometry\RestModel\AltitudeConverter;
use Navplan\Geometry\RestModel\Circle2dConverter;
use Navplan\Notam\DomainModel\NotamGeometry;
use Navplan\Notam\RestModel\NotamGeometryConverter;
use NavplanTest\Notam\Mocks\DummyNotamGeometry1;
use NavplanTest\Notam\Mocks\DummyNotamGeometry2;
use PHPUnit\Framework\TestCase;


class NotamGeometryConverterTest extends TestCase {
    public function test_toRest() {
        $ng1 = DummyNotamGeometry1::create();
        $ng2 = DummyNotamGeometry2::create();

        $restNg1 = NotamGeometryConverter::toRest($ng1);
        $restNg2 = NotamGeometryConverter::toRest($ng2);

        $this->assertEquals(DummyNotamGeometry1::createRest(), $restNg1);
        $this->assertEquals(DummyNotamGeometry2::createRest(), $restNg2);
    }


    public function test_toRest_circle() {
        $circle = new Circle2d(new Position2d(-22.883333,16.133333), new Length(9260, LengthUnit::NM));
        $alt_bottom = new Altitude(0, AltitudeUnit::FT, AltitudeReference::GND);
        $alt_top = new Altitude(4500, AltitudeUnit::FT, AltitudeReference::MSL);
        $notamGeometry = new NotamGeometry($circle, $alt_bottom, $alt_top);
        $rest = NotamGeometryConverter::toRest($notamGeometry);

        $this->assertEquals(Circle2dConverter::toRest($circle), $rest["circle"]);
        $this->assertEquals(AltitudeConverter::toRest($alt_bottom), $rest["alt_bottom"]);
        $this->assertEquals(AltitudeConverter::toRest($alt_top), $rest["alt_top"]);
    }


    public function test_toRest_polygon() {
        $polygon = Ring2d::createFromString("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1");
        $notamGeometry = new NotamGeometry($polygon, NULL, NULL);
        $rest = NotamGeometryConverter::toRest($notamGeometry);

        $this->assertEquals($polygon->toArray(), $rest["polygon"]);
    }


    public function test_toRest_multipolygon() {
        $multipoly = new MultiRing2d([
            Ring2d::createFromString("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1"),
            Ring2d::createFromString("4.1 44.1,4.9 44.9,5.1 45.1,4.1 44.1")]);
        $alt_bottom = new Altitude(100, AltitudeUnit::FL, AltitudeReference::STD);
        $notamGeometry = new NotamGeometry($multipoly, $alt_bottom, NULL);
        $rest = NotamGeometryConverter::toRest($notamGeometry);

        $this->assertEquals($multipoly->toArray(), $rest["multipolygon"]);
        $this->assertEquals(AltitudeConverter::toRest($alt_bottom), $rest["alt_bottom"]);
    }
}

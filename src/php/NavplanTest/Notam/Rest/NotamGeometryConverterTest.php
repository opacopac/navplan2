<?php declare(strict_types=1);

namespace NavplanTest\Notam\RestModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Circle2d;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\MultiRing2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Ring2d;
use Navplan\Common\Rest\Converter\RestAltitudeConverter;
use Navplan\Common\Rest\Converter\RestCircle2dConverter;
use Navplan\Notam\Domain\Model\NotamGeometry;
use Navplan\Notam\Rest\Model\RestNotamGeometryConverter;
use NavplanTest\Notam\Mocks\DummyNotamGeometry1;
use NavplanTest\Notam\Mocks\DummyNotamGeometry2;
use PHPUnit\Framework\TestCase;


class NotamGeometryConverterTest extends TestCase {
    public function test_toRest() {
        $ng1 = DummyNotamGeometry1::create();
        $ng2 = DummyNotamGeometry2::create();

        $restNg1 = RestNotamGeometryConverter::toRest($ng1);
        $restNg2 = RestNotamGeometryConverter::toRest($ng2);

        $this->assertEquals(DummyNotamGeometry1::createRest(), $restNg1);
        $this->assertEquals(DummyNotamGeometry2::createRest(), $restNg2);
    }


    public function test_toRest_circle() {
        $circle = new Circle2d(new Position2d(-22.883333,16.133333), new Length(9260, LengthUnit::NM));
        $alt_bottom = Altitude::fromFtAgl(0);
        $alt_top = Altitude::fromFtAmsl(4500);
        $notamGeometry = new NotamGeometry($circle, $alt_bottom, $alt_top);
        $rest = RestNotamGeometryConverter::toRest($notamGeometry);

        $this->assertEquals(RestCircle2dConverter::toRest($circle), $rest["circle"]);
        $this->assertEquals(RestAltitudeConverter::toRest($alt_bottom), $rest["alt_bottom"]);
        $this->assertEquals(RestAltitudeConverter::toRest($alt_top), $rest["alt_top"]);
    }


    public function test_toRest_polygon() {
        $polygon = Ring2d::createFromString("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1");
        $notamGeometry = new NotamGeometry($polygon, NULL, NULL);
        $rest = RestNotamGeometryConverter::toRest($notamGeometry);

        $this->assertEquals($polygon->toArray(), $rest["polygon"]);
    }


    public function test_toRest_multipolygon() {
        $multipoly = new MultiRing2d([
            Ring2d::createFromString("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1"),
            Ring2d::createFromString("4.1 44.1,4.9 44.9,5.1 45.1,4.1 44.1")]);
        $alt_bottom = Altitude::fromFl(100);
        $notamGeometry = new NotamGeometry($multipoly, $alt_bottom, NULL);
        $rest = RestNotamGeometryConverter::toRest($notamGeometry);

        $this->assertEquals($multipoly->toArray(), $rest["multipolygon"]);
        $this->assertEquals(RestAltitudeConverter::toRest($alt_bottom), $rest["alt_bottom"]);
    }
}

<?php declare(strict_types=1);

namespace NavplanTest\Notam\Rest;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Circle2d;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\MultiRing2d;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Domain\Ring2d;
use Navplan\Geometry\Rest\RestAltitude;
use Navplan\Geometry\Rest\RestCircle2d;
use Navplan\Notam\Domain\NotamGeometry;
use Navplan\Notam\Rest\RestNotamGeometry;
use PHPUnit\Framework\TestCase;


class RestNotamGeometryTest extends TestCase {
    public function test_toArray_circle() {
        $circle = new Circle2d(new Position2d(-22.883333,16.133333), new Length(9260, LengthUnit::NM));
        $alt_bottom = new Altitude(0, AltitudeUnit::FT, AltitudeReference::GND);
        $alt_top = new Altitude(4500, AltitudeUnit::FT, AltitudeReference::MSL);
        $notamGeometry = new NotamGeometry($circle, $alt_bottom, $alt_top);
        $rest = RestNotamGeometry::toArray($notamGeometry);

        $this->assertEquals(RestCircle2d::toArray($circle), $rest["circle"]);
        $this->assertEquals(RestAltitude::toArray($alt_bottom), $rest["alt_bottom"]);
        $this->assertEquals(RestAltitude::toArray($alt_top), $rest["alt_top"]);
    }


    public function test_toArray_polygon() {
        $polygon = Ring2d::createFromString("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1");
        $notamGeometry = new NotamGeometry($polygon, NULL, NULL);
        $rest = RestNotamGeometry::toArray($notamGeometry);

        $this->assertEquals($polygon->toArray(), $rest["polygon"]);
    }


    public function test_toArray_multipolygon() {
        $multipoly = new MultiRing2d([
            Ring2d::createFromString("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1"),
            Ring2d::createFromString("4.1 44.1,4.9 44.9,5.1 45.1,4.1 44.1")]);
        $alt_bottom = new Altitude(100, AltitudeUnit::FL, AltitudeReference::STD);
        $notamGeometry = new NotamGeometry($multipoly, $alt_bottom, NULL);
        $rest = RestNotamGeometry::toArray($notamGeometry);

        $this->assertEquals($multipoly->toArray(), $rest["multipolygon"]);
        $this->assertEquals(RestAltitude::toArray($alt_bottom), $rest["alt_bottom"]);
    }
}

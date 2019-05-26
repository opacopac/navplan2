<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Rest;

use Navplan\OpenAip\Rest\AirportRest;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class AirportRestTest extends TestCase {
    public function test_toArray()
    {
        $ad = DummyAirport1::create();
        $adRest = AirportRest::toArray($ad);

        $this->assertEquals($ad->id, $adRest["id"]);
        $this->assertEquals($ad->type, $adRest["type"]);
        $this->assertEquals($ad->name, $adRest["name"]);
        $this->assertEquals($ad->icao, $adRest["icao"]);
        $this->assertEquals($ad->country, $adRest["country"]);
        $this->assertEquals(round($ad->position->latitude, 6), $adRest["latitude"]);
        $this->assertEquals(round($ad->position->longitude, 6), $adRest["longitude"]);
        $this->assertEquals($ad->elevation, $adRest["elevation"]);
        $this->assertEquals(count($ad->runways), count($adRest["runways"]));
        $this->assertEquals(count($ad->radios), count($adRest["radios"]));
        $this->assertEquals(count($ad->webcams), count($adRest["webcams"]));
        $this->assertEquals(count($ad->charts), count($adRest["charts"]));
        $this->assertEquals(count($ad->mapfeatures), count($adRest["mapfeatures"]));

        $rwy1 = DummyAirport1::createRunway1();
        $this->assertEquals($rwy1->name, $adRest["runways"][0]["name"]);
        $this->assertEquals($rwy1->surface, $adRest["runways"][0]["surface"]);
        $this->assertEquals($rwy1->length, $adRest["runways"][0]["length"]);
        $this->assertEquals($rwy1->width, $adRest["runways"][0]["width"]);
        $this->assertEquals($rwy1->direction1, $adRest["runways"][0]["direction1"]);
        $this->assertEquals($rwy1->direction2, $adRest["runways"][0]["direction2"]);
        $this->assertEquals($rwy1->tora1, $adRest["runways"][0]["tora1"]);
        $this->assertEquals($rwy1->tora2, $adRest["runways"][0]["tora2"]);
        $this->assertEquals($rwy1->lda1, $adRest["runways"][0]["lda1"]);
        $this->assertEquals($rwy1->lda2, $adRest["runways"][0]["lda2"]);
        $this->assertEquals($rwy1->papi1, $adRest["runways"][0]["papi1"]);
        $this->assertEquals($rwy1->papi2, $adRest["runways"][0]["papi2"]);

        $rwy2 = DummyAirport1::createRunway2();
        $this->assertEquals($rwy2->name, $adRest["runways"][1]["name"]);
        $this->assertEquals($rwy2->surface, $adRest["runways"][1]["surface"]);
        $this->assertEquals($rwy2->length, $adRest["runways"][1]["length"]);
        $this->assertEquals($rwy2->width, $adRest["runways"][1]["width"]);
        $this->assertEquals($rwy2->direction1, $adRest["runways"][1]["direction1"]);
        $this->assertEquals($rwy2->direction2, $adRest["runways"][1]["direction2"]);
        $this->assertEquals($rwy2->tora1, $adRest["runways"][1]["tora1"]);
        $this->assertEquals($rwy2->tora2, $adRest["runways"][1]["tora2"]);
        $this->assertEquals($rwy2->lda1, $adRest["runways"][1]["lda1"]);
        $this->assertEquals($rwy2->lda2, $adRest["runways"][1]["lda2"]);
        $this->assertEquals($rwy2->papi1, $adRest["runways"][1]["papi1"]);
        $this->assertEquals($rwy2->papi2, $adRest["runways"][1]["papi2"]);

        $rdo1 = DummyAirport1::createRadio1();
        $this->assertEquals($rdo1->category, $adRest["radios"][0]["category"]);
        $this->assertEquals($rdo1->frequency, $adRest["radios"][0]["frequency"]);
        $this->assertEquals($rdo1->type, $adRest["radios"][0]["type"]);
        $this->assertEquals($rdo1->typespec, $adRest["radios"][0]["typespec"]);
        $this->assertEquals($rdo1->description, $adRest["radios"][0]["description"]);

        $rdo2 = DummyAirport1::createRadio2();
        $this->assertEquals($rdo2->category, $adRest["radios"][1]["category"]);
        $this->assertEquals($rdo2->frequency, $adRest["radios"][1]["frequency"]);
        $this->assertEquals($rdo2->type, $adRest["radios"][1]["type"]);
        $this->assertEquals($rdo2->typespec, $adRest["radios"][1]["typespec"]);
        $this->assertEquals($rdo2->description, $adRest["radios"][1]["description"]);

        $cam1 = DummyAirport1::createWebcam1();
        $this->assertEquals($cam1->name, $adRest["webcams"][0]["name"]);
        $this->assertEquals($cam1->url, $adRest["webcams"][0]["url"]);

        $feat = DummyAirport1::createMapFeature1();
        $this->assertEquals($feat->type, $adRest["mapfeatures"][0]["type"]);
        $this->assertEquals($feat->name, $adRest["mapfeatures"][0]["name"]);
    }
}

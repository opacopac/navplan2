<?php declare(strict_types=1);

namespace NavplanTest\Notam\Rest;

use Navplan\Notam\Rest\NotamRest;
use NavplanTest\Notam\Mocks\DummyNotam1;
use PHPUnit\Framework\TestCase;


class NotamRestTest extends TestCase {
    public function test_toArray() {
        $notam = DummyNotam1::create();
        $notamRest = NotamRest::toArray($notam);

        $this->assertEquals($notam->id, $notamRest["id"]);
        $this->assertEquals($notam->stateCode, $notamRest["statecode"]);
        $this->assertEquals($notam->stateName,$notamRest["statename"]);
        $this->assertEquals($notam->notamId, $notamRest["notamid"]);
        $this->assertEquals($notam->entity, $notamRest["entity"]);
        $this->assertEquals($notam->status, $notamRest["status"]);
        $this->assertEquals($notam->qcode, $notamRest["qcode"]);
        $this->assertEquals($notam->area, $notamRest["area"]);
        $this->assertEquals($notam->subarea, $notamRest["subarea"]);
        $this->assertEquals($notam->condition, $notamRest["condition"]);
        $this->assertEquals($notam->subject, $notamRest["subject"]);
        $this->assertEquals($notam->modifier, $notamRest["modifier"]);
        $this->assertEquals($notam->message, $notamRest["message"]);
        $this->assertEquals($notam->startdate, $notamRest["startdate"]);
        $this->assertEquals($notam->enddate, $notamRest["enddate"]);
        $this->assertEquals($notam->all, $notamRest["all"]);
        $this->assertEquals($notam->location, $notamRest["location"]);
        $this->assertEquals($notam->isIcao, $notamRest["isicao"]);
        $this->assertEquals($notam->created, $notamRest["created"]);
        $this->assertEquals($notam->key, $notamRest["key"]);
        $this->assertEquals($notam->type, $notamRest["type"]);
        $this->assertEquals($notam->geometry, $notamRest["geometry"]);
    }
}

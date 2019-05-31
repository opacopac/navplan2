<?php declare(strict_types=1);

namespace NavplanTest\System;

use InvalidArgumentException;
use Navplan\Shared\RequestResponseHelper;
use NavplanTest\System\Mock\HttpResponseServiceMock;
use PHPUnit\Framework\TestCase;


class RequestResponseHelperTest extends TestCase {
    private $httpService;


    private function getHttpService(): HttpResponseServiceMock {
        return $this->httpService;
    }


    protected function setUp(): void {
        parent::setUp();

        $this->httpService = new HttpResponseServiceMock();
    }


    // region sendRestResponse

    public function test_sendRestResponse_assoc_array() {
        $data = array("a" => "abc", "b" => "efg");
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data);

        $this->assertRegExp('/^\{"a":"abc","b":"efg"\}$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponse_list_array() {
        $data = [];
        array_push($data, "abc");
        array_push($data, "efg");
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data);

        $this->assertRegExp('/^\["abc","efg"\]$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponseWithRoot_emtpy_list() {
        $data = [];
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data);

        $this->assertRegExp('/^\[\]$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponse_emtpy_array() {
        $data = array();
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data);

        $this->assertRegExp('/^\[\]$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponse_callback() {
        $data = [];
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data, "callback123");

        $this->assertRegExp('/^callback123\(\[\]\)$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponse_empty_callback_throws_exception() {
        $data = [];
        $this->expectException(InvalidArgumentException::class);
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data, "");
    }


    public function test_sendRestResponse_json_numeric() {
        $data = array('icao' => '112233');
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data, NULL, TRUE);

        $this->assertRegExp('/^{"icao":112233}$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponse_json_non_numeric() {
        $data = array('icao' => '112233');
        RequestResponseHelper::sendArrayResponse($this->getHttpService(), $data, NULL, FALSE);

        $this->assertRegExp('/^{"icao":"112233"}$/', $this->getHttpService()->body);
    }
    // endregion


    // region sendRestResponseWithRoot

    public function test_sendRestResponseWithRoot_assoc_array() {
        $root = "root";
        $data = array("a" => "abc", "b" => "efg");
        RequestResponseHelper::sendArrayResponseWithRoot($this->getHttpService(), $root, $data);

        $this->assertRegExp('/^\{\"root\":\{"a":"abc","b":"efg"\}\}$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponseWithRoot_list_array() {
        $root = "root";
        $data = [];
        array_push($data, "abc");
        array_push($data, "efg");
        RequestResponseHelper::sendArrayResponseWithRoot($this->getHttpService(), $root, $data);

        $this->assertRegExp('/^\{\"root\":\["abc","efg"\]\}$/', $this->getHttpService()->body);
    }


    public function test_sendRestResponseWithRoot_empty_root_throws_exception() {
        $root = "";
        $data = [];
        $this->expectException(InvalidArgumentException::class);
        RequestResponseHelper::sendArrayResponseWithRoot($this->getHttpService(), $root, $data);
    }

    // endregion


    // region sendStringResponse

    public function test_sendStringResponse() {
        $data = "MEEP";
        RequestResponseHelper::sendStringResponse($this->getHttpService(), $data);

        $this->assertRegExp('/^MEEP$/', $this->getHttpService()->body);
    }


    public function test_sendStringResponse_with_callback() {
        $data = "MEEP";
        RequestResponseHelper::sendStringResponse($this->getHttpService(), $data, "callback123");

        $this->assertRegExp('/^callback123\(MEEP\)$/', $this->getHttpService()->body);
    }

    // endregion
}

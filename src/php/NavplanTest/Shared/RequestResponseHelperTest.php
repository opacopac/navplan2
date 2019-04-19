<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use InvalidArgumentException;
use Navplan\Shared\RequestResponseHelper;
use PHPUnit\Framework\TestCase;


class RequestResponseHelperTest extends TestCase {
    // region sendRestResponse

    public function test_sendRestResponse_assoc_array() {
        $data = array("a" => "abc", "b" => "efg");
        RequestResponseHelper::sendArrayResponse($data);

        $this->expectOutputRegex('/^\{"a":"abc","b":"efg"\}$/');
    }


    public function test_sendRestResponse_list_array() {
        $data = [];
        array_push($data, "abc");
        array_push($data, "efg");
        RequestResponseHelper::sendArrayResponse($data);

        $this->expectOutputRegex('/^\["abc","efg"\]$/');
    }


    public function test_sendRestResponseWithRoot_emtpy_list() {
        $data = [];
        RequestResponseHelper::sendArrayResponse($data);

        $this->expectOutputRegex('/^\[\]$/');
    }


    public function test_sendRestResponse_emtpy_array() {
        $data = array();
        RequestResponseHelper::sendArrayResponse($data);

        $this->expectOutputRegex('/^\[\]$/');
    }


    public function test_sendRestResponse_callback() {
        $data = [];
        RequestResponseHelper::sendArrayResponse($data, "callback123");

        $this->expectOutputRegex('/^callback123\(\[\]\)$/');
    }


    public function test_sendRestResponse_empty_callback_throws_exception() {
        $data = [];
        $this->expectException(InvalidArgumentException::class);
        RequestResponseHelper::sendArrayResponse($data, "");
    }


    public function test_sendRestResponse_json_numeric() {
        $data = array('icao' => '112233');
        RequestResponseHelper::sendArrayResponse($data, NULL, TRUE);

        $this->expectOutputRegex('/^{"icao":112233}$/');
    }


    public function test_sendRestResponse_json_non_numeric() {
        $data = array('icao' => '112233');
        RequestResponseHelper::sendArrayResponse($data, NULL, FALSE);

        $this->expectOutputRegex('/^{"icao":"112233"}$/');
    }
    // endregion


    // region sendRestResponseWithRoot

    public function test_sendRestResponseWithRoot_assoc_array() {
        $root = "root";
        $data = array("a" => "abc", "b" => "efg");
        RequestResponseHelper::sendArrayResponseWithRoot($root, $data);

        $this->expectOutputRegex('/^\{\"root\":\{"a":"abc","b":"efg"\}\}$/');
    }


    public function test_sendRestResponseWithRoot_list_array() {
        $root = "root";
        $data = [];
        array_push($data, "abc");
        array_push($data, "efg");
        RequestResponseHelper::sendArrayResponseWithRoot($root, $data);

        $this->expectOutputRegex('/^\{\"root\":\["abc","efg"\]\}$/');
    }


    public function test_sendRestResponseWithRoot_empty_root_throws_exception() {
        $root = "";
        $data = [];
        $this->expectException(InvalidArgumentException::class);
        RequestResponseHelper::sendArrayResponseWithRoot($root, $data);
    }

    // endregion


    // region sendStringResponse

    public function test_sendStringResponse() {
        $data = "MEEP";
        RequestResponseHelper::sendStringResponse($data);

        $this->expectOutputRegex('/^MEEP$/');
    }


    public function test_sendStringResponse_with_callback() {
        $data = "MEEP";
        RequestResponseHelper::sendStringResponse($data, "callback123");

        $this->expectOutputRegex('/^callback123\(MEEP\)$/');
    }

    // endregion
}

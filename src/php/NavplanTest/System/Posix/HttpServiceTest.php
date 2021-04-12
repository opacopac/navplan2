<?php declare(strict_types=1);

namespace NavplanTest\System\Posix;

use InvalidArgumentException;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\Posix\HttpService;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class HttpServiceTest extends TestCase {
    private MockHttpService $httpServiceMock;
    private IHttpService $httpService;


    protected function setUp(): void {
        $this->httpService = HttpService::getInstance();
        $this->httpServiceMock = new MockHttpService();
    }


    public function test_writes_a_payload() {
        $this->httpService->sendPayload("MEEP");
        $this->expectOutputString('MEEP');
    }


    public function test_writes_a_header() {
        $this->httpServiceMock->sendHeader("MEEP");
        $this->assertEquals('MEEP', $this->httpServiceMock->headerList[0]);
    }


    // region sendRestResponse

    public function test_sendRestResponse_assoc_array() {
        $data = array("a" => "abc", "b" => "efg");

        $this->httpServiceMock->sendArrayResponse($data);

        $this->assertRegExp('/^\{"a":"abc","b":"efg"\}$/', $this->httpServiceMock->body);
    }


    public function test_sendRestResponse_list_array() {
        $data = [];
        array_push($data, "abc");
        array_push($data, "efg");

        $this->httpServiceMock->sendArrayResponse($data);

        $this->assertRegExp('/^\["abc","efg"\]$/', $this->httpServiceMock->body);
    }


    public function test_sendRestResponseWithRoot_emtpy_list() {
        $data = [];

        $this->httpServiceMock->sendArrayResponse($data);

        $this->assertRegExp('/^\[\]$/', $this->httpServiceMock->body);
    }


    public function test_sendRestResponse_emtpy_array() {
        $data = array();

        $this->httpServiceMock->sendArrayResponse($data);

        $this->assertRegExp('/^\[\]$/', $this->httpServiceMock->body);
    }


    public function test_sendRestResponse_callback() {
        $data = [];

        $this->httpServiceMock->sendArrayResponse($data, "callback123");

        $this->assertRegExp('/^callback123\(\[\]\)$/', $this->httpServiceMock->body);
    }


    public function test_sendRestResponse_empty_callback_throws_exception() {
        $data = [];
        $this->expectException(InvalidArgumentException::class);

        $this->httpServiceMock->sendArrayResponse($data, "");
    }


    public function test_sendRestResponse_json_numeric() {
        $data = array('icao' => '112233');

        $this->httpServiceMock->sendArrayResponse($data, NULL, TRUE);

        $this->assertRegExp('/^{"icao":112233}$/', $this->httpServiceMock->body);
    }


    public function test_sendRestResponse_json_non_numeric() {
        $data = array('icao' => '112233');

        $this->httpServiceMock->sendArrayResponse($data, NULL, FALSE);

        $this->assertRegExp('/^{"icao":"112233"}$/', $this->httpServiceMock->body);
    }
    // endregion


    // region sendStringResponse

    public function test_sendStringResponse() {
        $data = "MEEP";

        $this->httpServiceMock->sendStringResponse($data);

        $this->assertRegExp('/^MEEP$/', $this->httpServiceMock->body);
    }


    public function test_sendStringResponse_with_callback() {
        $data = "MEEP";

        $this->httpServiceMock->sendStringResponse($data, "callback123");

        $this->assertRegExp('/^callback123\(MEEP\)$/', $this->httpServiceMock->body);
    }

    // endregion
}

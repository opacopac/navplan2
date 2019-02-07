<?php declare(strict_types=1);

use Navplan\Shared\InvalidFormatException;
use Navplan\Traffic\TrafficDetails;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class TrafficDetailsTest extends TestCase {
    private $dbService;
    private $args;
    private $response;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->args = [
            array('icao' => 'C0FFEE', 'ac_type' => 'AAT3', 'reg' => 'HB-SRA', 'call' => 'TODO'),
            array('icao' => '4b18f3', 'ac_type' => 'GAZL', 'reg' => 'HB-ZRD', 'call' => 'TODO'),
            array('icao' => '446622', 'ac_type' => 'A320', 'reg' => 'N12345', 'call' => 'SWR123')
        ];

        $this->response = [
            array('icao' => 'C0FFEE', 'reg' => 'HB-SRA', 'manufacturer' => 'AERO (3)', 'model' => 'AT-3', 'opCallsign' => NULL, 'ac_type' => 'L', 'eng_type' => 'P'),
            array('icao' => '4b18f3', 'reg' => 'HB-ZRD', 'manufacturer' => 'ABHCO', 'model' => 'Gazelle', 'opCallsign' => 'TODO', 'ac_type' => 'H', 'eng_type' => 'J'),
            array('icao' => '446622', 'reg' => 'N12345', 'manufacturer' => 'AIRBUS', 'model' => 'A-320', 'opCallsign' => 'Swiss 123', 'ac_type' => 'L', 'eng_type' => 'J')
        ];
    }


    /*public function test_getDetails_returns_details_for_an_icao_code() {
        $args = [array('icao' => 'C0FFEE')];
        $this->expectOutputRegex('/\{\"acdetails.*\}/');
        TrafficDetails::getDetails($this->args, $this->getDbService());
    }


    public function test_getDetails_empty_argument_returns_empty_result() {
        $this->expectOutputRegex('/^\{\"acdetails\"\:\[\]\}$/');
        TrafficDetails::getDetails([], $this->getDbService());
    }


    public function test_getDetails_response_json() {
        $this->expectOutputRegex('/^\{.*\}$/');
        TrafficDetails::getDetails([], $this->getDbService());
    }


    public function test_getDetails_response_jsonp() {
        $this->args["callback"] = "callback77";
        $this->expectOutputRegex('/^callback77\(\{.*\}\)$/');
        TrafficDetails::getDetails([], $this->getDbService());
    }*/
}

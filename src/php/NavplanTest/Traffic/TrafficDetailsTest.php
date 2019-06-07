<?php declare(strict_types=1);

use Navplan\Traffic\TrafficDetails;
use NavplanTest\Db\Mock\DbServiceMock;
use NavplanTest\System\Mock\MockHttpResponseService;
use PHPUnit\Framework\TestCase;


class TrafficDetailsTest extends TestCase {
    private $args = array("action" => "readacdetails");
    private $dbService;
    private $httpService;
    private $mockResultLfrCh1 = array('icaohex' => '4B3142', 'registration' => 'HB-SRA', 'aircraftModelType' => 'AT-3 R100', 'manufacturer' => 'AERO AT SP. Z O.O.');
    private $mockResultBasestation1 = array('mode_s' => '4B3142', 'registration' => 'HB-SRA', 'manufacturer' => 'AERO 3', 'icao_type_code' => 'AAT3');
    private $mockResultBasestation2 = array('mode_s' => '111111', 'registration' => NULL, 'manufacturer' => NULL, 'icao_type_code' => '0000');
    private $mockResultIcaoAcTypes1 = array('designator' => 'AAT3', 'model' => 'AT-3', 'manufacturer' => 'AERO 3', 'ac_type' => 'L', 'eng_type' => 'P');
    private $mockResultIcaoAcTypes2 = array('designator' => 'A320', 'model' => 'A-320 Prestige', 'manufacturer' => 'AIRBUS', 'ac_type' => 'L', 'eng_type' => 'J');
    private $mockResultIcaoAcTypes3 = array('designator' => 'A320', 'model' => 'A-320', 'manufacturer' => 'AIRBUS', 'ac_type' => 'L', 'eng_type' => 'J');
    private $mockResultIcaoAcTypes4 = array('designator' => 'A320', 'model' => 'A-320 Fantasy', 'manufacturer' => 'BOEING', 'ac_type' => 'L', 'eng_type' => 'J');


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getHttpService(): MockHttpResponseService {
        return $this->httpService;
    }


    protected function setUp(): void {
        parent::setUp();

        $this->args = array("action" => "readacdetails");
        $this->dbService = new DbServiceMock();
        $this->httpService = new MockHttpResponseService();
    }


    public function test_getDetails_empty_argument_throws_an_exception() {
        $this->args["aclist"] = [];
        $this->expectException(InvalidArgumentException::class);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());
    }


    public function test_getDetails_returns_details_from_lfc_ch() {
        $this->args["aclist"] = [array('icao24' => $this->mockResultLfrCh1['icaohex'])];
        $this->getDbService()->pushMockResult([$this->mockResultLfrCh1]);
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $this->assertStringContainsString('FROM lfr_ch', $this->getDbService()->queryList[0]);
        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"' . $this->mockResultLfrCh1['icaohex'] . '",';
        $expectedRegExp .= '"reg":"' . $this->mockResultLfrCh1['registration'] . '",';
        $expectedRegExp .= '"model":"' . $this->mockResultLfrCh1['aircraftModelType'] . '",';
        $expectedRegExp .= '"manufacturer":"' . $this->mockResultLfrCh1['manufacturer'] . '",';
        $expectedRegExp .= '"ac_type":null,';
        $expectedRegExp .= '"ac_class":null,';
        $expectedRegExp .= '"eng_class":null';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_returns_details_from_basestation() {
        $this->args["aclist"] = [array('icao24' => $this->mockResultBasestation1['mode_s'])];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([$this->mockResultBasestation1]);
        $this->getDbService()->pushMockResult([]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $this->assertStringContainsString('FROM basestation_aircrafts', $this->getDbService()->queryList[1]);
        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"' . $this->mockResultBasestation1['mode_s'] . '",';
        $expectedRegExp .= '"reg":"' . $this->mockResultBasestation1['registration'] . '",';
        $expectedRegExp .= '"model":null,';
        $expectedRegExp .= '"manufacturer":"' . $this->mockResultBasestation1['manufacturer'] . '",';
        $expectedRegExp .= '"ac_type":"' . $this->mockResultBasestation1['icao_type_code'] . '",';
        $expectedRegExp .= '"ac_class":null,';
        $expectedRegExp .= '"eng_class":null';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_returns_details_from_icao_ac_types() {
        $this->args["aclist"] = [array('icao24' => 'C0FFEE', 'ac_type' => $this->mockResultIcaoAcTypes1['designator'])];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([$this->mockResultIcaoAcTypes1]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $this->assertStringContainsString('FROM icao_aircraft_type', $this->getDbService()->queryList[2]);
        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"C0FFEE",';
        $expectedRegExp .= '"reg":null,';
        $expectedRegExp .= '"model":"' . $this->mockResultIcaoAcTypes1['model'] . '",';
        $expectedRegExp .= '"manufacturer":"' . $this->mockResultIcaoAcTypes1['manufacturer'] . '",';
        $expectedRegExp .= '"ac_type":"' . $this->mockResultIcaoAcTypes1['designator'] . '",';
        $expectedRegExp .= '"ac_class":"' . $this->mockResultIcaoAcTypes1['ac_type'] . '",';
        $expectedRegExp .= '"eng_class":"' . $this->mockResultIcaoAcTypes1['eng_type'] . '"';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_combines_details_from_3_sources() {
        $this->args["aclist"] = [array('icao24' => $this->mockResultLfrCh1['icaohex'])];
        $this->getDbService()->pushMockResult([$this->mockResultLfrCh1]);
        $this->getDbService()->pushMockResult([$this->mockResultBasestation1]);
        $this->getDbService()->pushMockResult([$this->mockResultIcaoAcTypes1]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $this->assertStringContainsString('FROM icao_aircraft_type', $this->getDbService()->queryList[2]);
        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"' . $this->mockResultLfrCh1['icaohex'] . '",';
        $expectedRegExp .= '"reg":"' . $this->mockResultLfrCh1['registration'] . '",';
        $expectedRegExp .= '"model":"' . $this->mockResultLfrCh1['aircraftModelType'] . '",';
        $expectedRegExp .= '"manufacturer":"' . $this->mockResultLfrCh1['manufacturer'] . '",';
        $expectedRegExp .= '"ac_type":"' . $this->mockResultBasestation1['icao_type_code'] . '",';
        $expectedRegExp .= '"ac_class":"' . $this->mockResultIcaoAcTypes1['ac_type'] . '",';
        $expectedRegExp .= '"eng_class":"' . $this->mockResultIcaoAcTypes1['eng_type'] . '"';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_combines_details_from_2_sources() {
        $this->args["aclist"] = [array('icao24' => $this->mockResultBasestation1['mode_s'])];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([$this->mockResultBasestation1]);
        $this->getDbService()->pushMockResult([$this->mockResultIcaoAcTypes1]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"' . $this->mockResultBasestation1['mode_s'] . '",';
        $expectedRegExp .= '"reg":"' . $this->mockResultBasestation1['registration'] . '",';
        $expectedRegExp .= '"model":"' . $this->mockResultIcaoAcTypes1['model'] . '",';
        $expectedRegExp .= '"manufacturer":"' . $this->mockResultBasestation1['manufacturer'] . '",';
        $expectedRegExp .= '"ac_type":"' . $this->mockResultBasestation1['icao_type_code'] . '",';
        $expectedRegExp .= '"ac_class":"' . $this->mockResultIcaoAcTypes1['ac_type'] . '",';
        $expectedRegExp .= '"eng_class":"' . $this->mockResultIcaoAcTypes1['eng_type'] . '"';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_multiple_entries_of_same_aircraft_type() {
        $this->args["aclist"] = [array('icao24' => 'C0FFEE', 'ac_type' => $this->mockResultIcaoAcTypes2['designator'])];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([$this->mockResultIcaoAcTypes2, $this->mockResultIcaoAcTypes3]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"C0FFEE",';
        $expectedRegExp .= '"reg":null,';
        $expectedRegExp .= '"model":null,';
        $expectedRegExp .= '"manufacturer":"' . $this->mockResultIcaoAcTypes2['manufacturer'] . '",';
        $expectedRegExp .= '"ac_type":"' . $this->mockResultIcaoAcTypes2['designator'] . '",';
        $expectedRegExp .= '"ac_class":"' . $this->mockResultIcaoAcTypes2['ac_type'] . '",';
        $expectedRegExp .= '"eng_class":"' . $this->mockResultIcaoAcTypes2['eng_type'] . '"';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_multiple_entries_of_same_aircraft_type_different_manufacturers() {
        $this->args["aclist"] = [array('icao24' => 'C0FFEE', 'ac_type' => $this->mockResultIcaoAcTypes2['designator'])];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([$this->mockResultIcaoAcTypes2, $this->mockResultIcaoAcTypes3, $this->mockResultIcaoAcTypes4]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"C0FFEE",';
        $expectedRegExp .= '"reg":null,';
        $expectedRegExp .= '"model":null,';
        $expectedRegExp .= '"manufacturer":null,';
        $expectedRegExp .= '"ac_type":"' . $this->mockResultIcaoAcTypes2['designator'] . '",';
        $expectedRegExp .= '"ac_class":"' . $this->mockResultIcaoAcTypes2['ac_type'] . '",';
        $expectedRegExp .= '"eng_class":"' . $this->mockResultIcaoAcTypes2['eng_type'] . '"';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_returns_no_details_if_not_found() {
        $this->args["aclist"] = [array('icao24' => 'C0FFEE')];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"C0FFEE",';
        $expectedRegExp .= '"reg":null,';
        $expectedRegExp .= '"model":null,';
        $expectedRegExp .= '"manufacturer":null,';
        $expectedRegExp .= '"ac_type":null,';
        $expectedRegExp .= '"ac_class":null,';
        $expectedRegExp .= '"eng_class":null';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_returns_no_type_for_type_code_0000() {
        $this->args["aclist"] = [array('icao24' => $this->mockResultBasestation2['mode_s'])];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([$this->mockResultBasestation2]);
        $this->getDbService()->pushMockResult([]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"' . $this->mockResultBasestation2['mode_s'] . '",';
        $expectedRegExp .= '"reg":null,';
        $expectedRegExp .= '"model":null,';
        $expectedRegExp .= '"manufacturer":null,';
        $expectedRegExp .= '"ac_type":null,';
        $expectedRegExp .= '"ac_class":null,';
        $expectedRegExp .= '"eng_class":null';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }


    public function test_getDetails_converts_icao24_to_upper_case() {
        $this->args["aclist"] = [array('icao24' => 'c0ffee')];
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        $this->getDbService()->pushMockResult([]);
        TrafficDetails::getDetails($this->args, $this->getDbService(), $this->getHttpService());

        $expectedRegExp = '/\{"acdetails":\[\{';
        $expectedRegExp .= '"icao24":"C0FFEE",';
        $expectedRegExp .= '"reg":null,';
        $expectedRegExp .= '"model":null,';
        $expectedRegExp .= '"manufacturer":null,';
        $expectedRegExp .= '"ac_type":null,';
        $expectedRegExp .= '"ac_class":null,';
        $expectedRegExp .= '"eng_class":null';
        $expectedRegExp .= '\}\]\}/';
        $this->assertRegExp($expectedRegExp, $this->getHttpService()->body);
    }
}

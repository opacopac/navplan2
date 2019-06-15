<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Traffic\Domain\ReadTrafficDetailsRequest;
use Navplan\Traffic\Domain\TrafficDetail;
use Navplan\Traffic\UseCase\ReadTrafficDetails;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail3;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail4;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use NavplanTest\Traffic\Mocks\MockTrafficRepo;
use PHPUnit\Framework\TestCase;


class TrafficDetailsTest extends TestCase {
    /* @var $trafficRepo MockTrafficRepo */
    private $trafficRepo;
    /* @var $readTrafficDetails ReadTrafficDetails */
    private $readTrafficDetails;


    private $args = array("action" => "readacdetails");
    private $mockResultLfrCh1 = array('icaohex' => '4B3142', 'registration' => 'HB-SRA', 'aircraftModelType' => 'AT-3 R100', 'manufacturer' => 'AERO AT SP. Z O.O.');
    private $mockResultBasestation1 = array('mode_s' => '4B3142', 'registration' => 'HB-SRA', 'manufacturer' => 'AERO 3', 'icao_type_code' => 'AAT3');
    private $mockResultBasestation2 = array('mode_s' => '111111', 'registration' => NULL, 'manufacturer' => NULL, 'icao_type_code' => '0000');
    private $mockResultIcaoAcTypes1 = array('designator' => 'AAT3', 'model' => 'AT-3', 'manufacturer' => 'AERO 3', 'ac_type' => 'L', 'eng_type' => 'P');
    private $mockResultIcaoAcTypes2 = array('designator' => 'A320', 'model' => 'A-320 Prestige', 'manufacturer' => 'AIRBUS', 'ac_type' => 'L', 'eng_type' => 'J');
    private $mockResultIcaoAcTypes3 = array('designator' => 'A320', 'model' => 'A-320', 'manufacturer' => 'AIRBUS', 'ac_type' => 'L', 'eng_type' => 'J');
    private $mockResultIcaoAcTypes4 = array('designator' => 'A320', 'model' => 'A-320 Fantasy', 'manufacturer' => 'BOEING', 'ac_type' => 'L', 'eng_type' => 'J');


    protected function setUp(): void {
        $config = new MockNavplanConfig();
        $this->trafficRepo = $config->getTrafficRepo();
        $this->readTrafficDetails = new ReadTrafficDetails($config);
    }


    public function test_getDetails_returns_details_from_lfc_ch() {
        $requestTraffic = new TrafficDetail('4B3142', NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic = DummyLfrchTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [$resultTraffic];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $result = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($result);
        $this->assertEquals(1, count($result));
        $this->assertEquals($resultTraffic, $result[0]);
    }


    public function test_getDetails_returns_details_from_basestation() {
        $requestTraffic = new TrafficDetail('4B3142', NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic = DummyBasestationTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $result = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($result);
        $this->assertEquals(1, count($result));
        $this->assertEquals($resultTraffic, $result[0]);
    }


    public function test_getDetails_returns_details_from_icao_ac_types() {
        $requestTraffic = new TrafficDetail('C0FFEE', NULL, NULL, NULL, "AAT3", NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic = DummyIcaoAcTypeTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals($resultTraffic->registration, $result->registration);
        $this->assertEquals($resultTraffic->model, $result->model);
        $this->assertEquals($resultTraffic->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic->acClass, $result->acClass);
        $this->assertEquals($resultTraffic->engClass, $result->engClass);
    }


    public function test_getDetails_combines_details_from_3_sources() {
        $requestTraffic = new TrafficDetail('4B3142', NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic1 = DummyLfrchTrafficDetail1::create();
        $resultTraffic2 = DummyBasestationTrafficDetail1::create();
        $resultTraffic3 = DummyIcaoAcTypeTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [$resultTraffic1];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic2];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals($resultTraffic1->registration, $result->registration);
        $this->assertEquals($resultTraffic1->model, $result->model);
        $this->assertEquals($resultTraffic1->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic2->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3->engClass, $result->engClass);
    }


    public function test_getDetails_combines_details_from_2_sources() {
        $requestTraffic = new TrafficDetail('4b3142', NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic2 = DummyBasestationTrafficDetail1::create();
        $resultTraffic3 = DummyIcaoAcTypeTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic2];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals($resultTraffic2->registration, $result->registration);
        $this->assertEquals($resultTraffic3->model, $result->model);
        $this->assertEquals($resultTraffic2->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic2->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3->engClass, $result->engClass);
    }


    public function test_getDetails_multiple_entries_of_same_aircraft_type() {
        $requestTraffic = new TrafficDetail('C0FFEE', NULL, NULL, NULL, "A320", NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic3a = DummyIcaoAcTypeTrafficDetail2::create();
        $resultTraffic3b = DummyIcaoAcTypeTrafficDetail3::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3a, $resultTraffic3b];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals($resultTraffic3a->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic3a->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3a->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3a->engClass, $result->engClass);
    }

    public function test_getDetails_multiple_entries_of_same_aircraft_type_different_manufacturers() {
        $requestTraffic = new TrafficDetail('C0FFEE', NULL, NULL, NULL, "a320", NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic3a = DummyIcaoAcTypeTrafficDetail2::create();
        $resultTraffic3b = DummyIcaoAcTypeTrafficDetail3::create();
        $resultTraffic3c = DummyIcaoAcTypeTrafficDetail4::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3a, $resultTraffic3b, $resultTraffic3c];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals(NULL, $result->manufacturer);
        $this->assertEquals($resultTraffic3a->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3a->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3a->engClass, $result->engClass);
    }


    public function test_getDetails_returns_empty_details_if_not_found() {
        $requestTraffic = new TrafficDetail('C0FFEE', NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals(NULL, $result->manufacturer);
        $this->assertEquals(NULL, $result->icaoAcType);
        $this->assertEquals(NULL, $result->acClass);
        $this->assertEquals(NULL, $result->engClass);
    }


    public function test_getDetails_returns_no_type_for_type_code_0000() {
        $requestTraffic = new TrafficDetail('111111', NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new ReadTrafficDetailsRequest([$requestTraffic]);
        $resultTraffic2 = DummyBasestationTrafficDetail2::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic2];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertEquals(1, count($resultList));
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->icao24, $result->icao24);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals(NULL, $result->manufacturer);
        $this->assertEquals(NULL, $result->icaoAcType);
        $this->assertEquals(NULL, $result->acClass);
        $this->assertEquals(NULL, $result->engClass);
    }
}
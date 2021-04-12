<?php declare(strict_types=1);

namespace NavplanTest\Traffic\UseCase;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;
use Navplan\Traffic\DomainModel\TrafficDetailsReadRequest;
use Navplan\Traffic\UseCase\ReadTrafficDetails\ReadTrafficDetailsUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyBasestationTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail1;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail2;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail3;
use NavplanTest\Traffic\Mocks\DummyIcaoAcTypeTrafficDetail4;
use NavplanTest\Traffic\Mocks\DummyLfrchTrafficDetail1;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use PHPUnit\Framework\TestCase;


class TrafficDetailsUcTest extends TestCase {
    private MockTrafficDetailRepo $trafficRepo;
    private ReadTrafficDetailsUc $readTrafficDetails;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->trafficRepo = $config->trafficDetailRepo;
        $this->readTrafficDetails = $config->getReadTrafficDetailsUc();
    }


    public function test_getDetails_returns_details_from_lfc_ch() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('4B3142', TrafficAddressType::ICAO), NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic = DummyLfrchTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [$resultTraffic];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $result = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($result);
        $this->assertCount(1, $result);
        $this->assertEquals($resultTraffic, $result[0]);
    }


    public function test_getDetails_returns_details_from_basestation() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('4B3142',TrafficAddressType::ICAO), NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic = DummyBasestationTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $result = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($result);
        $this->assertCount(1, $result);
        $this->assertEquals($resultTraffic, $result[0]);
    }


    public function test_getDetails_returns_details_from_icao_ac_types() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('C0FFEE', TrafficAddressType::ICAO),NULL, NULL, NULL, "AAT3", NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic = DummyIcaoAcTypeTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals($resultTraffic->registration, $result->registration);
        $this->assertEquals($resultTraffic->model, $result->model);
        $this->assertEquals($resultTraffic->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic->acClass, $result->acClass);
        $this->assertEquals($resultTraffic->engClass, $result->engClass);
    }


    public function test_getDetails_combines_details_from_3_sources() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('4B3142',TrafficAddressType::ICAO), NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic1 = DummyLfrchTrafficDetail1::create();
        $resultTraffic2 = DummyBasestationTrafficDetail1::create();
        $resultTraffic3 = DummyIcaoAcTypeTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [$resultTraffic1];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic2];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals($resultTraffic1->registration, $result->registration);
        $this->assertEquals($resultTraffic1->model, $result->model);
        $this->assertEquals($resultTraffic1->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic2->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3->engClass, $result->engClass);
    }


    public function test_getDetails_combines_details_from_2_sources() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('4b3142', TrafficAddressType::ICAO),NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic2 = DummyBasestationTrafficDetail1::create();
        $resultTraffic3 = DummyIcaoAcTypeTrafficDetail1::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic2];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals($resultTraffic2->registration, $result->registration);
        $this->assertEquals($resultTraffic3->model, $result->model);
        $this->assertEquals($resultTraffic2->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic2->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3->engClass, $result->engClass);
    }


    public function test_getDetails_multiple_entries_of_same_aircraft_type() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('C0FFEE', TrafficAddressType::ICAO),NULL, NULL, NULL, "A320", NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic3a = DummyIcaoAcTypeTrafficDetail2::create();
        $resultTraffic3b = DummyIcaoAcTypeTrafficDetail3::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3a, $resultTraffic3b];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals($resultTraffic3a->manufacturer, $result->manufacturer);
        $this->assertEquals($resultTraffic3a->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3a->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3a->engClass, $result->engClass);
    }

    public function test_getDetails_multiple_entries_of_same_aircraft_type_different_manufacturers() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('C0FFEE', TrafficAddressType::ICAO),NULL, NULL, NULL, "a320", NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic3a = DummyIcaoAcTypeTrafficDetail2::create();
        $resultTraffic3b = DummyIcaoAcTypeTrafficDetail3::create();
        $resultTraffic3c = DummyIcaoAcTypeTrafficDetail4::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [$resultTraffic3a, $resultTraffic3b, $resultTraffic3c];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals(NULL, $result->manufacturer);
        $this->assertEquals($resultTraffic3a->icaoAcType, $result->icaoAcType);
        $this->assertEquals($resultTraffic3a->acClass, $result->acClass);
        $this->assertEquals($resultTraffic3a->engClass, $result->engClass);
    }


    public function test_getDetails_returns_empty_details_if_not_found() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('C0FFEE', TrafficAddressType::ICAO),NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals(NULL, $result->manufacturer);
        $this->assertEquals(NULL, $result->icaoAcType);
        $this->assertEquals(NULL, $result->acClass);
        $this->assertEquals(NULL, $result->engClass);
    }


    public function test_getDetails_returns_no_type_for_type_code_0000() {
        $requestTraffic = new TrafficDetail(new TrafficAddress('111111', TrafficAddressType::ICAO),NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic]);
        $resultTraffic2 = DummyBasestationTrafficDetail2::create();
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [$resultTraffic2];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        /* @var $result TrafficDetail */
        $result = $resultList[0];
        $this->assertEquals($requestTraffic->address, $result->address);
        $this->assertEquals(NULL, $result->registration);
        $this->assertEquals(NULL, $result->model);
        $this->assertEquals(NULL, $result->manufacturer);
        $this->assertEquals(NULL, $result->icaoAcType);
        $this->assertEquals(NULL, $result->acClass);
        $this->assertEquals(NULL, $result->engClass);
    }


    public function test_getDetails_no_requests_to_lfrch_and_basestation_for_empty_icao24() {
        $requestTraffic1 = new TrafficDetail(NULL, NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic1]);
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        $this->assertEquals([], $this->trafficRepo->readDetailsFromLfrChArgs[0]);
        $this->assertEquals([], $this->trafficRepo->readDetailsFromBasestationArgs[0]);
    }


    public function test_getDetails_no_request_to_icaoactypes_for_empty_actypes() {
        $requestTraffic1 = new TrafficDetail(new TrafficAddress('111111', TrafficAddressType::ICAO),NULL, NULL, NULL, NULL, NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic1]);
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(1, $resultList);
        $this->assertEquals([], $this->trafficRepo->readDetailsFromIcaoAcTypesArgs[0]);
    }


    public function test_getDetails_group_request_by_icaoactypes() {
        $requestTraffic1 = new TrafficDetail(new TrafficAddress('111111', TrafficAddressType::ICAO),NULL, NULL, NULL, "A320", NULL, NULL);
        $requestTraffic2 = new TrafficDetail(new TrafficAddress('222222', TrafficAddressType::ICAO),NULL, NULL, NULL, "AAT3", NULL, NULL);
        $requestTraffic3 = new TrafficDetail(new TrafficAddress('333333', TrafficAddressType::ICAO),NULL, NULL, NULL, "A320", NULL, NULL);
        $request = new TrafficDetailsReadRequest([$requestTraffic1, $requestTraffic2, $requestTraffic3]);
        $this->trafficRepo->readDetailsFromLfrChResult = [];
        $this->trafficRepo->readDetailsFromBasestationResult = [];
        $this->trafficRepo->readDetailsFromIcaoAcTypesResult = [];

        $resultList = $this->readTrafficDetails->readDetails($request);

        $this->assertNotNull($resultList);
        $this->assertCount(3, $resultList);
        $this->assertEquals(["A320", "AAT3"], $this->trafficRepo->readDetailsFromIcaoAcTypesArgs[0]);
    }
}

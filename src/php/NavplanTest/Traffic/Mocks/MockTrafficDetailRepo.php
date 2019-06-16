<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\UseCase\ITrafficDetailRepo;


class MockTrafficDetailRepo implements ITrafficDetailRepo {
    /* @var $readDetailsFromLfrChResult array */
    public $readDetailsFromLfrChResult;
    /* @var $readDetailsFromLfrChArgs array */
    public $readDetailsFromLfrChArgs;

    /* @var $readDetailsFromBasestationResult array */
    public $readDetailsFromBasestationResult;
    /* @var $readDetailsFromBasestationArgs array */
    public $readDetailsFromBasestationArgs;

    /* @var $readDetailsFromIcaoAcTypesResult array */
    public $readDetailsFromIcaoAcTypesResult;
    /* @var $readDetailsFromIcaoAcTypesArgs array */
    public $readDetailsFromIcaoAcTypesArgs;


    public function __construct() {
    }


    public function readDetailsFromLfrCh(array $icao24List): array {
        $this->readDetailsFromLfrChArgs = [$icao24List];

        return $this->readDetailsFromLfrChResult;
    }


    public function readDetailsFromBasestation(array $icao24List): array {
        $this->readDetailsFromBasestationArgs = [$icao24List];

        return $this->readDetailsFromBasestationResult;
    }


    public function readDetailsFromIcaoAcTypes(array $acTypeList): array {
        $this->readDetailsFromIcaoAcTypesArgs = [$acTypeList];

        return $this->readDetailsFromIcaoAcTypesResult;
    }
}

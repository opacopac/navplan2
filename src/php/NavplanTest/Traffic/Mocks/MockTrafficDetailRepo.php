<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainService\ITrafficDetailRepo;


class MockTrafficDetailRepo implements ITrafficDetailRepo {
    public array $readDetailsFromLfrChResult;
    public array $readDetailsFromLfrChArgs;
    public array $readDetailsFromBasestationResult;
    public array $readDetailsFromBasestationArgs;
    public array $readDetailsFromIcaoAcTypesResult;
    public array $readDetailsFromIcaoAcTypesArgs;


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

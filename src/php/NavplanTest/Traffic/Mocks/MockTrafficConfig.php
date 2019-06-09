<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\UseCase\IAdsbexGateway;
use Navplan\Traffic\UseCase\IOgnGateway;
use Navplan\Traffic\UseCase\ITrafficConfig;


class MockTrafficConfig implements ITrafficConfig {
    private $adsbexGateway;
    private $ognGateway;


    public function __construct() {
        $this->adsbexGateway = new MockAdsbexGateway();
        $this->ognGateway = new MockOgnGateway();
    }


    public function getAdsbexGateway(): IAdsbexGateway {
        return $this->adsbexGateway;
    }


    public function getOgnGateway(): IOgnGateway {
        return $this->ognGateway;
    }
}

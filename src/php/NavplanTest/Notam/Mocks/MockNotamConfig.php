<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\INotamRepo;


class MockNotamConfig implements INotamConfig {
    private $notamRepo;


    public function __construct() {
        $this->notamRepo = new MockNotamRepo();
    }


    public function getNotamRepo(): INotamRepo {
        return $this->notamRepo;
    }
}

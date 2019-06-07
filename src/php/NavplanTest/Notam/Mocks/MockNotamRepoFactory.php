<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Notam\UseCase\INotamRepo;
use Navplan\Notam\UseCase\INotamRepoFactory;


class MockNotamRepoFactory implements INotamRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new MockNotamRepo();
    }


    public function createNotamSearch(): INotamRepo {
        return $this->repoMock;
    }
}

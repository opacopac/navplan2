<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Notam\IRepo\INotamRepo;
use Navplan\Notam\IRepo\INotamRepoFactory;


class NotamMockRepoFactory implements INotamRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new NotamRepoMock();
    }


    public function createNotamRepo(): INotamRepo {
        return $this->repoMock;
    }
}

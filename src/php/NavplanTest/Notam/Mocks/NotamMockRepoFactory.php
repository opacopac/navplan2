<?php declare(strict_types=1);

namespace NavplanTest\Notam\Mocks;

use Navplan\Notam\IRepo\INotamSearch;
use Navplan\Notam\IRepo\INotamRepoFactory;


class NotamMockRepoFactory implements INotamRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new NotamSearchMock();
    }


    public function createNotamSearch(): INotamSearch {
        return $this->repoMock;
    }
}

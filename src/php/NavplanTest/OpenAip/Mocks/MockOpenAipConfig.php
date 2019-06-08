<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;


class MockOpenAipConfig implements IOpenAipConfig {
    private $openAipRepoFactory;


    public function __construct() {
        $this->openAipRepoFactory = new MockOpenAipRepoFactory();
    }


    public function getOpenAipRepoFactory(): IOpenAipRepoFactory {
        return $this->openAipRepoFactory;
    }
}

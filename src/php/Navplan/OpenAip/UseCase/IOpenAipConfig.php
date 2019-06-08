<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;


interface IOpenAipConfig  {
    function getOpenAipRepoFactory(): IOpenAipRepoFactory;
}

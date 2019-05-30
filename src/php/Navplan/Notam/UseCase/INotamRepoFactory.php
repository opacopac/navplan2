<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase;


interface INotamRepoFactory {
    function createNotamSearch(): INotamSearch;
}

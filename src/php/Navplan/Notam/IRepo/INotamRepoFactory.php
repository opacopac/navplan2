<?php declare(strict_types=1);

namespace Navplan\Notam\IRepo;


interface INotamRepoFactory {
    function createNotamSearch(): INotamSearch;
}

<?php declare(strict_types=1);

namespace Navplan\Search;

use Navplan\Common\Rest\Controller\IRestController;


interface ISearchDiContainer {
    function getSearchController(): IRestController;
}


